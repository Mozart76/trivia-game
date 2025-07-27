import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  useToast,
  Grid,
  GridItem,
  Checkbox,
  Badge,
  Flex,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import { categories } from '../data/categories';
import { motion } from 'framer-motion';

const CategorySelection = ({ onCategoriesSelected, selectedCategories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCats, setSelectedCats] = useState(selectedCategories);
  const toast = useToast();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categoryId) => {
    setSelectedCats(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedCats(categories.map(cat => cat.id));
  };

  const handleClearAll = () => {
    setSelectedCats([]);
  };

  const handleContinue = () => {
    if (selectedCats.length === 0) {
      toast({
        title: "لم يتم اختيار أي فئة",
        description: "الرجاء اختيار 6 فئات على الأقل للمتابعة",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedCats.length < 6) {
      toast({
        title: "عدد غير كافٍ من الفئات",
        description: `الرجاء اختيار 6 فئات على الأقل. لقد اخترت ${selectedCats.length} فئة.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedCats.length > 6) {
      toast({
        title: "عدد كبير جداً من الفئات",
        description: `الرجاء اختيار 6 فئات على الأقل. لقد اخترت ${selectedCats.length} فئة.`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onCategoriesSelected(selectedCats);
  };

  return (
    <Box
      p={0}
      maxW="100%"
      mx="auto"
      fontFamily="Cairo, sans-serif"
      color="#303030"
    >
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={6}>
          <Heading 
            size="2xl" 
            color="#2e53a5"
            fontWeight="bold"
            mb={3}
            letterSpacing="tight"
          >
            اختيار الفئات
          </Heading>
          <Text fontSize="lg" color="#303030" fontWeight="normal" maxW="500px" mx="auto">
            اختر 6 فئات بالضبط لتشملها في لعبة المعلومات العامة
          </Text>
        </Box>

        {/* Search and Controls */}
        <VStack spacing={6}>
          <InputGroup maxW="400px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <Text fontSize="lg">🔍</Text>
            </InputLeftElement>
            <Input
              placeholder="البحث في الفئات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="lg"
              borderColor="brand.200"
              _focus={{ borderColor: "#fcd34d", boxShadow: "0 0 0 2px #fcd34d" }}
              size="lg"
              bg="white"
              color="brand.800"
            />
          </InputGroup>

          <HStack spacing={4} justify="center">
            <Button
              size="md"
              variant="outline"
              onClick={handleSelectAll}
              borderColor="#fcd34d"
              color="#fcd34d"
              _hover={{ bg: "yellow.100" }}
              fontWeight="bold"
              borderRadius="lg"
            >
              تحديد الكل
            </Button>
            <Button
              size="md"
              variant="outline"
              onClick={handleClearAll}
              borderColor="#fcd34d"
              color="#fcd34d"
              _hover={{ bg: "yellow.100" }}
              fontWeight="bold"
              borderRadius="lg"
            >
              مسح الكل
            </Button>
          </HStack>

          <Box 
            textAlign="center" 
            p={3} 
            borderRadius="lg"
            bg={selectedCats.length === 6 ? "green.200" : "white"}
            color={selectedCats.length === 6 ? "green.800" : "brand.700"}
            borderColor={selectedCats.length === 6 ? "green.400" : "white"}
            fontWeight="bold"
          >
            {selectedCats.length === 6
              ? 'جاهز! لقد اخترت 6 فئات.'
              : `اختر 6 فئات. (${selectedCats.length} محدد)`}
          </Box>
        </VStack>

        {/* Category Grid */}
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }} gap={6} mt={6} justifyItems="center">
          {filteredCategories.map(category => {
            const isSelected = selectedCats.includes(category.id);
            const isDisabled = selectedCats.length >= 6 && !isSelected;
            
            return (
              <GridItem key={category.id}>
                                <Box
                  as={motion.div}
                  whileHover={!isDisabled ? { scale: 1.06, boxShadow: '0px 8px 32px rgba(44, 82, 130, 0.18)' } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  bg={isDisabled ? "gray.100" : "white"}
                  color={isDisabled ? "gray.400" : "#303030"}
                  borderRadius="2xl"
                  boxShadow="xl"
                  cursor={isDisabled ? "not-allowed" : "pointer"}
                  border={isSelected ? '3px solid #fcd34d' : '3px solid white'}
                  w="200px"
                  h="200px"
                  position="relative"
                  overflow="hidden"
                  onClick={() => !isDisabled && handleCategoryToggle(category.id)}
                  opacity={isDisabled ? 0.6 : 1}
                >
                  {/* Category Image - Full Card Background */}
                  <Image 
                    src={`/images/categories/${category.name.toLowerCase()}.jpg`} 
                    alt={category.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    position="absolute"
                    top="0"
                    left="0"
                    fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBDNzIuNTAwMSA1MCA1MCA3Mi41MDAxIDUwIDEwMEM1MCAxMjcuNDk5OSA3Mi41MDAxIDE1MCAxMDAgMTUwQzEyNy40OTk5IDE1MCAxNTAgMTI3LjQ5OTkgMTUwIDEwMEMxNTAgNzIuNTAwMSAxMjcuNDk5OSA1MCAxMDAgNTBaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMDAgNjVDMTEwLjQ1OSA2NSAxMTggNzIuNTQwOSAxMTggODJDMTE4IDkxLjQ1OTEgMTEwLjQ1OSA5OSAxMDAgOTlDODkuNTQwOSA5OSA4MiA5MS40NTkxIDgyIDgyQzgyIDcyLjU0MDkgODkuNTQwOSA2NSAxMDAgNjVaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMDAgMTE1Qzg5LjU0MDkgMTE1IDgyIDEyMi41NDA5IDgyIDEzMkM4MiAxNDEuNDU5MSA4OS41NDA5IDE0OSAxMDAgMTQ5QzExMC40NTkgMTQ5IDExOCAxNDEuNDU5MSAxMTggMTMyQzExOCAxMjIuNTQwOSAxMTAuNDU5IDExNSAxMDAgMTE1WiIgZmlsbD0iIzlCOUJBMCIvPgo8L3N2Zz4="
                  />
                  
                  {/* Overlay for better text readability */}
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.4)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* Category Name - White Text */}
                    <Text 
                      fontSize="xl" 
                      fontWeight="bold" 
                      color="white" 
                      textAlign="center"
                      textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)"
                      px={3}
                    >
                      {category.name}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
            );
          })}
        </Grid>

        {/* Continue Button */}
        <Button
          size="lg"
          colorScheme="yellow"
          borderRadius="xl"
          fontWeight="bold"
          mt={8}
          onClick={handleContinue}
          boxShadow="2xl"
          isFullWidth
        >
          متابعة
        </Button>
      </VStack>
    </Box>
  );
};

export default CategorySelection; 