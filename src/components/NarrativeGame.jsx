import React, { useState } from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const REWARD_CONTRACT_ADDRESS = 'YOUR_REWARD_CONTRACT_ADDRESS'; // From deployed AdventureReward.sol

function NarrativeGame({ hasNFT, tokenBalance, account }) {
  const [rewardStatus, setRewardStatus] = useState('');

  const claimReward = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        REWARD_CONTRACT_ADDRESS,
        [
          'function claimReward() external',
          'function hasClaimed(address) view returns (bool)',
        ],
        signer
      );

      const hasClaimed = await contract.hasClaimed(account);
      if (hasClaimed) {
        setRewardStatus('Reward already claimed!');
        return;
      }

      const tx = await contract.claimReward();
      await tx.wait();
      setRewardStatus('Reward claimed successfully!');
    } catch (error) {
      setRewardStatus('Error claiming reward: ' + error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Narrative Adventure
      </Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">
            {hasNFT ? 'Exclusive Quest: The Hidden Realm' : 'Basic Quest: The Village Path'}
          </Typography>
          <Typography>
            {hasNFT
              ? 'As a holder of the Sacred NFT, you enter a mystical realm with ancient secrets.'
              : 'You start as a traveler in a quiet village, seeking adventure.'}
          </Typography>
          {Number(tokenBalance) > 0.1 && (
            <Typography color="secondary">
              High ETH Balance Bonus: You wield a legendary sword!
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert('Continue the adventure!')}
          >
            Proceed
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6">Claim Your Onchain Reward</Typography>
          <Typography>
            {hasNFT
              ? 'Your NFT grants you a special reward! Claim it now.'
              : 'Own an NFT to claim a reward.'}
          </Typography>
          {rewardStatus && <Typography color="error">{rewardStatus}</Typography>}
        </CardContent>
        {hasNFT && (
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={claimReward}
            >
              Claim Reward
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
}

export default NarrativeGame;