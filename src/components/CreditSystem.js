import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  useToast,
  Badge,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Divider
} from '@chakra-ui/react';

const CreditSystem = ({ user, onPurchaseCredits, onLogout }) => {
  const [creditCode, setCreditCode] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handlePurchaseCredits = () => {
    if (!creditCode.trim()) {
      toast({
        title: "كود مطلوب",
        description: "يرجى إدخال كود الرصيد",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Validate credit code (you can implement your own validation logic)
    if (creditCode.length < 8) {
      toast({
        title: "كود غير صحيح",
        description: "يرجى إدخال كود صحيح",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onPurchaseCredits(creditCode);
    setCreditCode('');
    onClose();
  };



  const generateRandomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={8}
      boxShadow="2xl"
      maxW="400px"
      mx="auto"
      fontFamily="Cairo, sans-serif"
      color="#303030"
    >
      <VStack spacing={6} align="stretch">
        <Heading 
          size="lg" 
          textAlign="center" 
          color="#2e53a5"
          fontWeight="bold"
        >
          <span role="img" aria-label="user">👤</span> {user.username}
        </Heading>

        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" color="#303030">
              الألعاب المجانية:
            </Text>
            <Badge colorScheme={user.freeGames > 0 ? "green" : "red"} fontSize="lg" px={3} py={1}>
              {user.freeGames}
            </Badge>
          </HStack>

          <HStack justify="space-between" p={4} bg="gray.50" borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold" color="#303030">
              الرصيد المدفوع:
            </Text>
            <Badge colorScheme="blue" fontSize="lg" px={3} py={1}>
              {user.paidCredits}
            </Badge>
          </HStack>
        </VStack>

        <Divider />

        <VStack spacing={4}>
          <Button
            size="lg"
            colorScheme="green"
            borderRadius="xl"
            fontWeight="bold"
            onClick={onOpen}
            isFullWidth
            isDisabled={user.freeGames > 0 || user.paidCredits > 0}
          >
            شراء رصيد
          </Button>

          <Button
            size="md"
            colorScheme="red"
            variant="outline"
            borderRadius="lg"
            onClick={onLogout}
            isFullWidth
          >
            تسجيل الخروج
          </Button>
        </VStack>

        {/* Purchase Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent fontFamily="Cairo, sans-serif">
            <ModalHeader color="#2e53a5">شراء رصيد</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Text fontSize="md" color="#303030">
                  أدخل كود الرصيد لشراء ألعاب إضافية
                </Text>
                <Input
                  value={creditCode}
                  onChange={(e) => setCreditCode(e.target.value)}
                  placeholder="أدخل كود الرصيد..."
                  size="lg"
                  borderRadius="lg"
                  borderColor="brand.200"
                  _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                />
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  مثال على الكود: {generateRandomCode()}
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlePurchaseCredits}>
                شراء
              </Button>
              <Button variant="ghost" onClick={onClose}>
                إلغاء
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default CreditSystem; 