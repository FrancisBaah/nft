require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("dotenv").config();
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      // accounts: { mnemonic: process.env.MNMONIC },
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: "0.8.21",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
