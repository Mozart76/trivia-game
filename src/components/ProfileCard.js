import React from 'react';
import { Box, Flex, Avatar, Text, Badge, HStack, IconButton } from '@chakra-ui/react';

const ProfileCard = ({ username = 'W1ZARD', level = 7, coins = 2054, hearts = 14, gems = 12, avatarUrl }) => {
  return (
    <Box
      bg="brand.400"
      borderRadius="xl"
      boxShadow="2xl"
      p={4}
      color="white"
      minW="320px"
      maxW="360px"
      mx="auto"
      mt={6}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Avatar
            size="lg"
            name={username}
            src={avatarUrl}
            bg="accent.200"
            icon={<span role="img" aria-label="wizard">🧙‍♂️</span>} // Placeholder for 3D icon
            mr={4}
          />
          <Box>
            <Text fontSize="lg" fontWeight="normal" fontFamily="heading">
              {username}
            </Text>
            <Badge colorScheme="yellow" fontSize="sm" borderRadius="full" px={2} mt={1}>
              LEVEL {level}
            </Badge>
          </Box>
        </Flex>
        <HStack spacing={2}>
          <IconButton aria-label="coins" icon={<span role="img" aria-label="coins">🪙</span>} size="sm" bg="accent.200" color="gray.800" isRound />
          <Text fontWeight="bold">{coins}</Text>
          <IconButton aria-label="hearts" icon={<span role="img" aria-label="hearts">❤️</span>} size="sm" bg="accent.100" color="gray.800" isRound />
          <Text fontWeight="bold">{hearts}</Text>
          <IconButton aria-label="gems" icon={<span role="img" aria-label="gems">💎</span>} size="sm" bg="accent.300" color="gray.800" isRound />
          <Text fontWeight="bold">{gems}</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ProfileCard; 