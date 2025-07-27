import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Flex,
  Progress,
  Image
} from '@chakra-ui/react';

const ScoreBoard = ({ points, currentTeam, questionsAnswered, totalQuestions }) => {
  const getTeamColor = (teamName) => {
    return teamName === currentTeam ? '#fcd34d' : '#fff';
  };

  const getProgressPercentage = () => {
    return Math.round((questionsAnswered / totalQuestions) * 100);
  };

  // Get team names in order
  const teamNames = Object.keys(points);
  const team1 = teamNames[0];
  const team2 = teamNames[1];

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      boxShadow="2xl"
      fontFamily="Cairo, sans-serif"
      height="80px"
    >
      <Flex height="100%">
        {/* Logo Section - Left Side */}
        <Box
          width="200px"
          bg="gray.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/logo.png"
            alt="Game Logo"
            maxH="60px"
            maxW="160px"
            objectFit="contain"
          />
        </Box>

        {/* Team 1 Section - Blue Side */}
        <Box
          flex="1"
          bg="linear-gradient(135deg, #3182ce 0%, #2c5282 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {team1 === currentTeam && (
            <Box
              position="absolute"
              left="20px"
              top="50%"
              transform="translateY(-50%)"
              fontSize="2xl"
              color="#fcd34d"
              textShadow="0 2px 8px rgba(0,0,0,0.5)"
            >
              ⭐
            </Box>
          )}
          <VStack spacing={1} align="center">
            <Text 
              fontSize="xl" 
              fontWeight="bold"
              color={getTeamColor(team1)}
              textShadow="0 2px 8px rgba(0,0,0,0.5)"
            >
              {team1}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white" textShadow="0 2px 8px rgba(0,0,0,0.5)">
              <span role="img" aria-label="points">💎</span> {points[team1]}
            </Text>
          </VStack>
        </Box>

        {/* Progress Section - Center */}
        <Box
          width="300px"
          bg="gray.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={2}
        >
          <VStack spacing={2} align="center">
            <Text fontSize="sm" color="white" fontWeight="normal">
              التقدم
            </Text>
            <Progress 
              value={getProgressPercentage()} 
              size="lg" 
              colorScheme="yellow"
              borderRadius="full"
              w="200px"
              bg="gray.700"
              hasStripe
              isAnimated
            />
            <Text fontSize="sm" fontWeight="bold" color="white">
              {questionsAnswered} / {totalQuestions} ({getProgressPercentage()}%)
            </Text>
          </VStack>
        </Box>

        {/* Team 2 Section - Red Side */}
        <Box
          flex="1"
          bg="linear-gradient(135deg, #e53e3e 0%, #c53030 100%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {team2 === currentTeam && (
            <Box
              position="absolute"
              right="20px"
              top="50%"
              transform="translateY(-50%)"
              fontSize="2xl"
              color="#fcd34d"
              textShadow="0 2px 8px rgba(0,0,0,0.5)"
            >
              ⭐
            </Box>
          )}
          <VStack spacing={1} align="center">
            <Text 
              fontSize="xl" 
              fontWeight="bold"
              color={getTeamColor(team2)}
              textShadow="0 2px 8px rgba(0,0,0,0.5)"
            >
              {team2}
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="white" textShadow="0 2px 8px rgba(0,0,0,0.5)">
              <span role="img" aria-label="points">💎</span> {points[team2]}
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ScoreBoard; 