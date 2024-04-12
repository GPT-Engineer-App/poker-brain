import React, { useState } from "react";
import { Box, Button, Heading, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { FaHandPaper, FaHandRock, FaHandScissors } from "react-icons/fa";

const CHOICES = ["rock", "paper", "scissors"];

const getRandomChoice = () => {
  const randomIndex = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[randomIndex];
};

const getResult = (userChoice, botChoice) => {
  if (userChoice === botChoice) {
    return "It's a tie!";
  } else if ((userChoice === "rock" && botChoice === "scissors") || (userChoice === "paper" && botChoice === "rock") || (userChoice === "scissors" && botChoice === "paper")) {
    return "You win!";
  } else {
    return "Bot wins!";
  }
};

const Index = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [botChoice, setBotChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handlePlay = (choice) => {
    setUserChoice(choice);
    const botChoice = getRandomChoice();
    setBotChoice(botChoice);
    setResult(getResult(choice, botChoice));
  };

  return (
    <Box p={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Rock Paper Scissors Bot
      </Heading>
      <VStack spacing={8}>
        <Text fontSize="xl">Choose your move:</Text>
        <HStack spacing={4}>
          <Button onClick={() => handlePlay("rock")}>
            <FaHandRock size={32} />
          </Button>
          <Button onClick={() => handlePlay("paper")}>
            <FaHandPaper size={32} />
          </Button>
          <Button onClick={() => handlePlay("scissors")}>
            <FaHandScissors size={32} />
          </Button>
        </HStack>
        {userChoice && (
          <>
            <Text fontSize="xl">You chose: {userChoice}</Text>
            <Text fontSize="xl">Bot chose: {botChoice}</Text>
            <Text fontSize="2xl" fontWeight="bold">
              {result}
            </Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
