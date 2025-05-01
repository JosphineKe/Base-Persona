import React, { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import WalletConnect from './components/WalletConnect';
import AssetChecker from './components/AssetChecker';
import NarrativeGame from './components/NarrativeGame';

function App() {
  const [account, setAccount] = useState(null);
  const [hasNFT, setHasNFT] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Base ID Adventures
          </Typography>
          {account && (
            <Typography>
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <WalletConnect setAccount={setAccount} />
        {account && (
          <>
            <AssetChecker
              account={account}
              setHasNFT={setHasNFT}
              setTokenBalance={setTokenBalance}
            />
            <NarrativeGame
              hasNFT={hasNFT}
              tokenBalance={tokenBalance}
              account={account}
            />
          </>
        )}
      </Container>
    </div>
  );
}

export default App;