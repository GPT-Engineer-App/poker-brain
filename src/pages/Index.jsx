import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import PokerTable from "../components/PokerTable";

const Index = () => {
  return (
    <Box p={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Texas Hold'em Poker Bot
      </Heading>
      <PokerTable />
    </Box>
  );
};

export default Index;
