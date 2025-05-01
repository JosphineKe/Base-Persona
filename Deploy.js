async function main() {
    const AdventureReward = await ethers.getContractFactory("AdventureReward");
    const reward = await AdventureReward.deploy("YOUR_NFT_CONTRACT_ADDRESS"); // Replace with your NFT contract address
    await reward.deployed();
    console.log("AdventureReward deployed to:", reward.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });