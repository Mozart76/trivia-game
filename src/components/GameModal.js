import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  HStack,
  Box,
  Badge,
  Input,
  useToast
} from '@chakra-ui/react';

const GameModal = ({ 
  isOpen, 
  onClose, 
  currentQuestion, 
  onTeamCorrect, // new: function(teamName)
  teamNames = [], // new: array of team names
  points,
  gameState 
}) => {
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const timerRef = React.useRef();

  React.useEffect(() => {
    if (isOpen && currentQuestion) {
      setShowAnswer(false);
      setTimer(0);
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isOpen, currentQuestion]);

  React.useEffect(() => {
    if (!isOpen) clearInterval(timerRef.current);
  }, [isOpen]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'green';
      case 'medium': return 'yellow';
      case 'hard': return 'red';
      default: return 'gray';
    }
  };

  const getPointsForDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 100;
      case 'medium': return 300;
      case 'hard': return 500;
      default: return 100;
    }
  };

  if (!currentQuestion) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent 
        bg="white"
        borderRadius="2xl"
        boxShadow="2xl"
        fontFamily="Cairo, sans-serif"
        color="#303030"
      >
        <ModalHeader 
          textAlign="center" 
          color="#2e53a5"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="1px"
        >
          <span role="img" aria-label="question">❓</span> سؤال المعلومات العامة
        </ModalHeader>
        <ModalCloseButton color="#303030" />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Badge 
                colorScheme={getDifficultyColor(currentQuestion.difficulty)}
                fontSize="lg"
                p={3}
                borderRadius="full"
                bg="gray.100"
                color="#303030"
                boxShadow="md"
              >
                <span role="img" aria-label="star">⭐</span> {currentQuestion.difficulty === 'easy' ? 'سهل' : currentQuestion.difficulty === 'medium' ? 'متوسط' : 'صعب'} - {getPointsForDifficulty(currentQuestion.difficulty)} نقطة
              </Badge>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="#303030" lineHeight="1.6">
                {currentQuestion.question}
              </Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="md" color="#2e53a5">
                <span role="img" aria-label="timer">⏱️</span> المؤقت: <b>{timer}ث</b>
              </Text>
            </Box>
            {!showAnswer && (
              <Button
                colorScheme="yellow"
                onClick={() => setShowAnswer(true)}
                fontWeight="bold"
                size="lg"
                borderRadius="lg"
                boxShadow="md"
              >
                عرض الإجابة
              </Button>
            )}
            {showAnswer && (
              <VStack spacing={4} align="center">
                <Text fontSize="xl" color="#2e53a5" fontWeight="bold">
                  <span role="img" aria-label="answer">💡</span> الإجابة: <b>{currentQuestion.answer}</b>
                </Text>
                <Text fontSize="md" color="#303030">من أجاب بشكل صحيح؟</Text>
                <HStack spacing={6} justify="center">
                  {teamNames.map(team => (
                    <Button
                      key={team}
                      colorScheme="green"
                      size="lg"
                      fontWeight="bold"
                      borderRadius="full"
                      boxShadow="md"
                      onClick={() => onTeamCorrect(team)}
                    >
                      {team}
                    </Button>
                  ))}
                </HStack>
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            fontWeight="bold"
            color="#303030"
            borderRadius="lg"
            _hover={{ bg: 'gray.100' }}
          >
            إلغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GameModal; 