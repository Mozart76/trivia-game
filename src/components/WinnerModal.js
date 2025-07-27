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
  Box
} from '@chakra-ui/react';

const WinnerModal = ({ isOpen, onClose, winnerName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent
        bgGradient="linear(to-br, brand.400, brand.700)"
        borderRadius="2xl"
        boxShadow="2xl"
        color="white"
        fontFamily="Cairo, sans-serif"
      >
        <ModalHeader
          textAlign="center"
          color="#fcd34d"
          fontSize="2xl"
          fontWeight="bold"
          letterSpacing="1px"
          textShadow="0 2px 8px #232e6b"
        >
          <span role="img" aria-label="trophy">🏆</span> انتهت اللعبة!
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing={6} align="center">
            <Box textAlign="center">
              <Text fontSize="3xl" fontWeight="bold" color="#fcd34d" textShadow="0 2px 8px #232e6b">
                <span role="img" aria-label="confetti">🎉</span> الفائز: {winnerName} <span role="img" aria-label="confetti">🎉</span>
              </Text>
            </Box>
            <Text fontSize="lg" color="white" fontWeight="normal">
              تهانينا! لقد حصلت على أعلى النقاط!
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="yellow"
            borderRadius="lg"
            fontWeight="bold"
            onClick={onClose}
            boxShadow="md"
          >
            العب مرة أخرى
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WinnerModal; 