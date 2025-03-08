require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ethers } = require("ethers");

// 🔹 Load & Validate Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const PROVIDER_URL = process.env.PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contractABI = require("./contractABI.json");

if (!MONGO_URI || !PROVIDER_URL || !PRIVATE_KEY || !CONTRACT_ADDRESS) {
    console.error("❌ Missing required environment variables. Check .env file.");
    process.exit(1);
}

// 🔹 Initialize Express
const app = express();
app.use(cors({ origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5000"] })); // ✅ CORS Updated
app.use(express.json());

// 🔹 Connect to MongoDB
mongoose.set("strictQuery", false); // Avoid deprecation warning
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if MongoDB connection fails
    });

// 🔹 Define MongoDB Schema & Model
const energyListingSchema = new mongoose.Schema({
    seller: { type: String, required: true },
    energyAmount: { type: Number, required: true },
    price: { type: Number, required: true },
    txHash: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const EnergyListing = mongoose.model("EnergyListing", energyListingSchema);

// 🔹 Blockchain Setup
const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);

/**
 * 📌 Root Route (Check if Server is Running)
 */
app.get("/", (req, res) => {
    res.status(200).json({ message: "Energix Backend is Running 🚀" });
});

/**
 * 📌 API: List Energy for Sale
 */
app.post("/api/list-energy", async (req, res) => {
    try {
        const { seller, energyAmount, price } = req.body;

        if (!seller || !energyAmount || !price) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("⚡ Listing Energy:", { seller, energyAmount, price });

        // 🔹 Call smart contract function
        let tx;
        try {
            tx = await contract.listEnergy(
                ethers.parseEther(energyAmount.toString()), 
                ethers.parseEther(price.toString())
            );
            await tx.wait();
        } catch (err) {
            console.error("❌ Blockchain transaction failed:", err);
            return res.status(500).json({ error: "Transaction failed", details: err.message });
        }

        console.log("✅ Energy listed on blockchain, Tx Hash:", tx.hash);

        // 🔹 Save to MongoDB
        const newListing = new EnergyListing({ seller, energyAmount, price, txHash: tx.hash });
        await newListing.save();

        res.status(201).json({ message: "Energy listed successfully!", txHash: tx.hash });
    } catch (error) {
        console.error("❌ Error listing energy:", error);
        res.status(500).json({ error: "Failed to list energy", details: error.message });
    }
});

/**
 * 📌 API: Fetch All Energy Listings
 */
app.get("/api/energy-listings", async (req, res) => {
    try {
        const listings = await EnergyListing.find().sort({ timestamp: -1 });
        res.status(200).json(listings);
    } catch (error) {
        console.error("❌ Error fetching listings:", error);
        res.status(500).json({ error: "Failed to fetch listings", details: error.message });
    }
});

// 🔹 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
