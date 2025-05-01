import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { Typography, Box } from '@mui/material';

const NFT_CONTRACT_ADDRESS = 'YOUR_NFT_CONTRACT_ADDRESS'; // Replace with your ERC-721 contract
const REWARD_CONTRACT_ADDRESS = 'YOUR_REWARD_CONTRACT_ADDRESS'; // From deployed AdventureReward.sol

function AssetChecker({ account, setHasNFT, setTokenBalance }) {
  useEffect(() => {
    const checkAssets = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Check NFT ownership
      const nftContract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        ['function balanceOf(address owner) view returns (uint256)'],
        provider
      );
      const nftBalance = await nftContract.balanceOf(account);
      setHasNFT(nftBalance > 0);

      // Check token balance (native ETH for simplicity)
      const balance = await provider.getBalance(account);
      setTokenBalance(ethers.formatEther(balance));
    };

    if (account) checkAssets();
  }, [account, setHasNFT, setTokenBalance]);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">
        Onchain Identity Status
      </Typography>
      <Typography>NFT Owned: {hasNFT ? 'Yes' : 'No'}</Typography>
      <Typography>ETH Balance: {tokenBalance} ETH</Typography>
    </Box>
  );
}

export default AssetChecker;