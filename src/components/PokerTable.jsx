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

  const calculateBotAction = (state) => {
    const { communityCards, botHand } = state;
    const allCards = [...communityCards, ...botHand];

    const ranks = allCards.map((card) => card[0]);
    const suits = allCards.map((card) => card[1]);
    const rankCounts = ranks.reduce((counts, rank) => {
      counts[rank] = (counts[rank] || 0) + 1;
      return counts;
    }, {});

    const hasPair = Object.values(rankCounts).some((count) => count >= 2);
    const hasTwoPair = Object.values(rankCounts).filter((count) => count >= 2).length >= 2;
    const hasThreeOfAKind = Object.values(rankCounts).some((count) => count >= 3);

    const suitCounts = suits.reduce((counts, suit) => {
      counts[suit] = (counts[suit] || 0) + 1;
      return counts;
    }, {});
    const hasFlushDraw = Object.values(suitCounts).some((count) => count >= 4);

    if (hasThreeOfAKind || hasTwoPair) {
      return "raise";
    } else if (hasPair || hasFlushDraw) {
      return "call";
    } else {
      return "fold";
    }
  };

  const handlePlayerAction = (action) => {
    const updatedState = {
      ...gameState,
      playerAction: action,
      potSize: action === "raise" ? gameState.potSize + 10 : gameState.potSize,
    };

    const botAction = calculateBotAction(updatedState);
    setGameState({
      ...updatedState,
      botAction,
      potSize: botAction === "raise" ? updatedState.potSize + 10 : updatedState.potSize,
    });
  };

  const startNewHand = () => {
    setGameState({
      communityCards: dealCards(5),
      playerHand: dealCards(2),
      botHand: dealCards(2),
      potSize: 0,
      botAction: null,
    });
    startNewHand();
  };

  useEffect(() => {
    startNewHand();
  }, []);

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
