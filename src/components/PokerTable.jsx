import React, { useState } from "react";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

const PokerTable = () => {
  const [gameState, setGameState] = useState({
    communityCards: [],
    playerHand: [],
    botHand: [],
    potSize: 0,
    botAction: null,
  });

  const handlePlayerAction = (action) => {
    const updatedState = { ...gameState, playerAction: action };
    setGameState(updatedState);

    const botAction = "call";
    setGameState({ ...updatedState, botAction });
  };

  return (
    <Box>
      <VStack spacing={4}>
        <Text fontSize="xl">Community Cards: {gameState.communityCards.join(", ")}</Text>
        <Text fontSize="xl">Your Hand: {gameState.playerHand.join(", ")}</Text>
        <Text fontSize="xl">Bot's Hand: {gameState.botHand.join(", ")}</Text>
        <Text fontSize="xl">Bot's Action: {gameState.botAction}</Text>
        <Text fontSize="xl">Pot Size: {gameState?.potSize || 0}</Text>
        <HStack spacing={4}>
          <Button leftIcon={<FaCoins />} onClick={() => handlePlayerAction("call")}>
            Call
          </Button>
          <Button onClick={() => handlePlayerAction("fold")}>Fold</Button>
          <Button onClick={() => handlePlayerAction("raise")}>Raise</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PokerTable;
