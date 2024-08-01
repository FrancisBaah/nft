const fs = require("fs");
let { networkConfig } = require("../helper-hardhat-config");
const { ethers } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  log("......");
  const FrancisNFT = await deploy("FrancisNFT", {
    from: deployer,
    // args: ["Hello"],
    log: true,
  });
  log(`FrancisNFT deployed to ${FrancisNFT.address}`);
  let filepath = "./img/triagle.svg";
  let svg = fs.readFileSync(filepath, { encoding: "utf8" });
  const svgNFTContract = await ethers.getContractFactory("FrancisNFT");
  const accounts = await hre.ethers.getSigners();
  const signer = await accounts[0];
  const svgNFT = new ethers.Contract(
    FrancisNFT.address,
    svgNFTContract.interface,
    signer
  );
  const networkName = networkConfig[chainId]["name"];
  log(
    `Verify with: \n npx hardhat verify ---network ${networkName} ${svgNFT.address}`
  );

  let transactionResponse = await svgNFT.create(svg);
  let receipt = await transactionResponse.wait(1);
  log("You've made an NFT");
  log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`);
};

module.exports.tags = ["FrancisNFT"];
