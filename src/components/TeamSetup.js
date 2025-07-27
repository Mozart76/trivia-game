import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react';

const TeamSetup = ({ onStartGame }) => {
  const [teamNames, setTeamNames] = useState({ 'Team A': '', 'Team B': '' });
  const toast = useToast();

  const handleTeamNameChange = (team, value) => {
    setTeamNames(prev => ({
      ...prev,
      [team]: value
    }));
  };

  const handleStartGame = () => {
    // Validate team names
    const teamA = teamNames['Team A'].trim();
    const teamB = teamNames['Team B'].trim();
    
    if (!teamA || !teamB) {
      toast({
        title: "أسماء الفرق مطلوبة",
        description: "يرجى إدخال أسماء للفريقين",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (teamA === teamB) {
      toast({
        title: "أسماء مختلفة مطلوبة",
        description: "يرجى إدخال أسماء مختلفة لكل فريق",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Start game with custom team names
    onStartGame({
      'Team A': teamA,
      'Team B': teamB
    });
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={10}
      boxShadow="2xl"
      maxW="500px"
      mx="auto"
      fontFamily="Cairo, sans-serif"
      color="gray.800"
    >
      <VStack spacing={8} align="stretch">
        <Heading 
          size="xl" 
          textAlign="center" 
          color="#2e53a5"
          fontWeight="bold"
          textShadow="0 2px 8px rgba(0,0,0,0.1)"
        >
          <span role="img" aria-label="teams">👥</span> إدخال أسماء الفرق
        </Heading>
        
        <Text fontSize="lg" color="gray.600" textAlign="center" fontWeight="normal">
          يرجى إدخال أسماء الفريقين لبدء اللعبة
        </Text>

        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
              <span role="img" aria-label="team a">🟦</span> اسم الفريق الأول
            </FormLabel>
            <Input
              value={teamNames['Team A']}
              onChange={(e) => handleTeamNameChange('Team A', e.target.value)}
              placeholder="أدخل اسم الفريق الأول..."
              size="lg"
              borderRadius="lg"
              borderColor="brand.200"
              _focus={{ borderColor: "#fcd34d", boxShadow: "0 0 0 2px #fcd34d" }}
              fontFamily="Cairo, sans-serif"
              bg="white"
              color="brand.800"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
              <span role="img" aria-label="team b">🟥</span> اسم الفريق الثاني
            </FormLabel>
            <Input
              value={teamNames['Team B']}
              onChange={(e) => handleTeamNameChange('Team B', e.target.value)}
              placeholder="أدخل اسم الفريق الثاني..."
              size="lg"
              borderRadius="lg"
              borderColor="brand.200"
              _focus={{ borderColor: "#fcd34d", boxShadow: "0 0 0 2px #fcd34d" }}
              fontFamily="Cairo, sans-serif"
              bg="white"
              color="brand.800"
            />
          </FormControl>
        </VStack>

        <Button
          size="lg"
          colorScheme="yellow"
          borderRadius="xl"
          fontWeight="bold"
          fontSize="xl"
          py={6}
          mt={4}
          onClick={handleStartGame}
          boxShadow="2xl"
        >
          بدء اللعبة
        </Button>
      </VStack>
    </Box>
  );
};

export default TeamSetup; 