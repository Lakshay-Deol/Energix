# EnergiX Project

## What is EnergiX?
EnergiX is a platform where people can buy and sell energy using blockchain technology. Think of it like a marketplace specifically for energy trading, where transactions are secure and transparent.

## What Is Needed

### Basic Tools
- **Node.js** - The engine that runs our code
- **npm** - Package managers to install other tools
- **Git** - To keep track of code changes

### For the Blockchain Part
- **Solidity** - The programming language for writing smart contracts
- **Hardhat** - A toolkit that makes blockchain development easier
- **MetaMask** - A browser wallet to connect to the blockchain
- **Testnet** - A practice blockchain where you can test without using real money
- **Ethers.js** - Helps your website talk to the blockchain

### For Storing Data
- **MongoDB** - A database to store user information
- **Express** - Helps build the server side of the application
- **Mongoose** - Makes working with MongoDB easier

### For the Website
- **HTML, CSS, JavaScript** - The building blocks of any website
- **Ethers.js** - Connects your website to blockchain


## What project Will Do
- Let users log in with their MetaMask wallet
- Create and manage energy tokens
- Buy and sell energy with other users
- See a history of all transactions
- Manage user profiles and wallets in metamask
- Track energy production and usage in real-time

## Important Setup Files
- **hardhat.config.js** - Settings for the blockchain part
- **mongodb.config.js** - Settings for the database
- **.env** - Secret information like passwords and keys
/////////env file//////////////
{PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/energix
PROVIDER_URL=http://127.0.0.1:8545
PRIVATE_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3}

## Getting Started
1. Install Node.js on your computer
2. Install MetaMask extension in your browser
3. Set up a MongoDB database
4. Clone the project code to your computer
5. Install all the required packages
6. Set up your environment variables in the .env file
7. Start the development server

## Testing Things Out
Once you're set up, you can:
- Create an account using MetaMask
- Add some test tokens to your wallet
- Try buying or selling energy
- Check your transaction history

Remember, this is a learning project! Don't use real money or sensitive information while testing.
