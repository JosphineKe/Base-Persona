import React from 'react';
import { Button, Box, Alert } from '@mui/material';
import { ethers } from 'ethers';

function WalletConnect({ setAccount }) {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);

        // Ensure Base Mainnet
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }], // Base Mainnet Chain ID
        });
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Button variant="contained" color="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </Box>
  );
}

export default WalletConnect;