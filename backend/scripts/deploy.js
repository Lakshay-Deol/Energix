const hre = require("hardhat");

async function main() {
    console.log("🚀 Deploying Smart Contract...");

    // Get the contract factory
    const EnergyTrading = await hre.ethers.getContractFactory("EnergyTrading");

    // Deploy contract
    const contract = await EnergyTrading.deploy(); // No need for `.deployed()` in ethers v6

    console.log(`✅ Contract deployed to: ${contract.target}`);

    // Save contract address for later use
    saveDeploymentInfo(contract.target);
}

function saveDeploymentInfo(contractAddress) {
    const fs = require("fs");
    const deploymentInfo = { contractAddress };

    fs.writeFileSync("deployment.json", JSON.stringify(deploymentInfo, null, 2));
    console.log("📁 Contract address saved to deployment.json");
}

// Run the deployment
main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
