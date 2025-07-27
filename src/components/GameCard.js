import React from 'react';
import { Box, Flex, Text, Button, Badge, VStack, HStack } from '@chakra-ui/react';

const GameCard = ({
  icon = <span role="img" aria-label="punk duck" style={{ fontSize: '3rem' }}>🦆</span>,
  name = 'PUNK DUCK',
  winRate = '14%',
  coins = 1200,
  onPlayWorld,
  onPlayFriends
}) => {
  return (
    <Box
      bg="brand.300"
      borderRadius="xl"
      boxShadow="2xl"
      p={6}
      color="white"
      maxW="400px"
      mx="auto"
      mt={8}
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="center" align="center">
          {icon}
        </Flex>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" letterSpacing="1px">
          {name}
        </Text>
        <HStack justify="center" spacing={6} mt={2}>
          <Badge colorScheme="green" fontSize="md" px={3} py={1} borderRadius="full">
            {winRate} <span style={{ marginLeft: 4 }}>🏆</span>
          </Badge>
          <Badge colorScheme="yellow" fontSize="md" px={3} py={1} borderRadius="full">
            {coins} <span style={{ marginLeft: 4 }}>🪙</span>
          </Badge>
        </HStack>
        <VStack spacing={3} mt={4}>
          <Button w="100%" colorScheme="pink" size="lg" fontWeight="bold" borderRadius="lg" onClick={onPlayWorld}>
            PLAY VS WORLD
          </Button>
          <Button w="100%" colorScheme="cyan" size="lg" fontWeight="bold" borderRadius="lg" onClick={onPlayFriends}>
            PLAY VS FRIENDS
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default GameCard; 