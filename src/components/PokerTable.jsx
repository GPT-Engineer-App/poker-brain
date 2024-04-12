import React, { useState, useEffect } from "react";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

const suits = ["h", "d", "c", "s"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];

const dealCards = (numCards) => {
  const deck = values.flatMap((v) => suits.map((s) => v + s));
  const shuffled = deck.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, numCards);
};

const PokerTable = () => {
  const [gameState, setGameState] = useState(() => ({
    communityCards: dealCards(5),
    playerHand: dealCards(2),
    botHand: dealCards(2),
    potSize: 0,
    botAction: null,
  }));

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
