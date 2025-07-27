import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Button,
  Center,
  HStack,
  Image
} from '@chakra-ui/react';

const CARD_SIZE = {
  w: '140px',
  h: '80px',
};

const DIFFICULTY_POINTS = [
  { label: 'easy', value: 100, emoji: '🟢' },
  { label: 'medium', value: 300, emoji: '🟡' },
  { label: 'hard', value: 500, emoji: '🔴' }
];

const GameBoard = ({
  categories,
  questions,
  onCellClick,
  usedCells
}) => {
  return (
    <Box
      w="full"
      py={6}
      display="flex"
      justifyContent="center"
    >
      <HStack spacing={6} align="flex-start" flexWrap="wrap" justify="center">
        {categories.map((cat) => (
          <Box
            key={cat.id}
            bgGradient="linear(to-br, brand.400, brand.700)"
            borderRadius="2xl"
            p={4}
            display="flex"
            flexDir="column"
            alignItems="center"
            boxShadow="2xl"
            minW="180px"
            maxW="200px"
          >
            {/* Category Header */}
            <VStack spacing={2} mb={4}>
              <Box
                w="60px"
                h="60px"
                borderRadius="full"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
                boxShadow="lg"
                border="3px solid white"
              >
                <Image 
                  src={`/images/categories/${cat.name.toLowerCase()}.jpg`} 
                  alt={cat.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAxNUMyMi4wMDAxIDE1IDE1IDIyLjAwMDEgMTUgMzBDMTUgMzcuOTk5OSAyMi4wMDAxIDQ1IDMwIDQ1QzM3Ljk5OTkgNDUgNDUgMzcuOTk5OSA0NSAzMEM0NSAyMi4wMDAxIDM3Ljk5OTkgMTUgMzAgMTVaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0zMCAyMEMzNC40MTgzIDIwIDM4IDIzLjU4MTcyIDM4IDI4QzM4IDMyLjQxODMgMzQuNDE4MyAzNiAzMCAzNkMyNS41ODE3IDM2IDIyIDMyLjQxODMgMjIgMjhDMjIgMjMuNTgxNzIgMjUuNTgxNyAyMCAzMCAyMFoiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTMwIDM0QzI1LjU4MTcgMzQgMjIgMzcuNTgxNyAyMiA0MkMyMiA0Ni40MTgzIDI1LjU4MTcgNTAgMzAgNTBDMzQuNDE4MyA1MCAzOCA0Ni40MTgzIDM4IDQyQzM4IDM3LjU4MTcgMzQuNDE4MyAzNCAzMCAzNFoiIGZpbGw9IiM5QjlCQTAiLz4KPC9zdmc+"
                />
              </Box>
              <Text fontSize="lg" fontWeight="bold" color="white" textShadow="0 2px 8px #232e6b" textAlign="center">
                {cat.name}
              </Text>
            </VStack>

            {/* Question Cards */}
            <VStack spacing={2} w="full">
              {DIFFICULTY_POINTS.map((diff) => (
                <VStack key={diff.label} spacing={2} w="full">
                  {[0, 1].map((slot) => {
                    const cellKey = `${cat.id}-${diff.label}-${slot}`;
                    const isUsed = usedCells[cellKey];
                    return (
                      <Button
                        key={cellKey}
                        w={CARD_SIZE.w}
                        h={CARD_SIZE.h}
                        fontSize="xl"
                        fontWeight="bold"
                        borderRadius="xl"
                        boxShadow="lg"
                        bg={isUsed ? 'gray.400' : 'white'}
                        color={isUsed ? 'gray.600' : 'brand.700'}
                        _hover={{ 
                          bg: isUsed ? 'gray.400' : 'brand.200', 
                          color: 'brand.800',
                          transform: 'scale(1.05)'
                        }}
                        isDisabled={isUsed}
                        onClick={() => onCellClick(cat, diff.label, slot)}
                        transition="all 0.2s"
                        position="relative"
                        overflow="hidden"
                        my={1}
                      >
                        <VStack spacing={0}>
                          <Text fontSize="3xl" fontWeight="bold" color={isUsed ? 'gray.500' : 'brand.700'}>
                            {diff.value}
                          </Text>
                        </VStack>
                        {isUsed && (
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            fontSize="2xl"
                            color="gray.500"
                          >
                            ✓
                          </Box>
                        )}
                      </Button>
                    );
                  })}
                </VStack>
              ))}
            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default GameBoard; 