// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AdventureReward is Ownable {
    IERC721 public nftContract;
    uint256 public rewardAmount = 1 ether; // Example reward (adjust for token decimals)
    mapping(address => bool) public hasClaimed;

    event RewardClaimed(address indexed user, uint256 amount);

    constructor(address _nftContract) Ownable(msg.sender) {
        nftContract = IERC721(_nftContract);
    }

    function claimReward() external {
        require(!hasClaimed[msg.sender], "Reward already claimed");
        require(nftContract.balanceOf(msg.sender) > 0, "No NFT owned");

        hasClaimed[msg.sender] = true;
        (bool sent, ) = msg.sender.call{value: rewardAmount}("");
        require(sent, "Failed to send reward");

        emit RewardClaimed(msg.sender, rewardAmount);
    }

    function setRewardAmount(uint256 _amount) external onlyOwner {
        rewardAmount = _amount;
    }

    // Fund contract for rewards
    receive() external payable {}
}