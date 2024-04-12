import React, { useState } from "react";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";
import { FaCoins } from "react-icons/fa";

const PokerTable = () => {
  const [gameState, setGameState] = useState(null);

  return (
    <Box>
      {}
      <VStack spacing={4}>
        <Text fontSize="xl">Community Cards:</Text>
        {}
        <Text fontSize="xl">Your Hand:</Text>
        {}
        <Text fontSize="xl">Bot's Hand:</Text>
        {}
        <Text fontSize="xl">Pot Size: {gameState?.potSize || 0}</Text>
        <HStack spacing={4}>
          <Button leftIcon={<FaCoins />} onClick={() => {}}>
            Call
          </Button>
          <Button onClick={() => {}}>Fold</Button>
          <Button onClick={() => {}}>Raise</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default PokerTable;
