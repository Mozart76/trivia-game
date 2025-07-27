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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const toast = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (isLogin) {
      // Login logic
      if (!formData.username || !formData.password) {
        toast({
          title: "بيانات مطلوبة",
          description: "يرجى إدخال اسم المستخدم وكلمة المرور",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      onLogin(formData);
    } else {
      // Registration logic
      if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        toast({
          title: "بيانات مطلوبة",
          description: "يرجى ملء جميع الحقول",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "كلمة المرور غير متطابقة",
          description: "يرجى التأكد من تطابق كلمة المرور",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "كلمة المرور قصيرة",
          description: "يجب أن تكون كلمة المرور 6 أحرف على الأقل",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      onRegister(formData);
    }
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
      color="#303030"
    >
      <VStack spacing={8} align="stretch">
        <Heading 
          size="xl" 
          textAlign="center" 
          color="#2e53a5"
          fontWeight="bold"
        >
          <span role="img" aria-label="game">🎮</span> لعبة المعلومات العامة
        </Heading>
        
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab 
              onClick={() => setIsLogin(true)}
              color={isLogin ? "#2e53a5" : "gray.500"}
              fontWeight="bold"
            >
              تسجيل الدخول
            </Tab>
            <Tab 
              onClick={() => setIsLogin(false)}
              color={!isLogin ? "#2e53a5" : "gray.500"}
              fontWeight="bold"
            >
              إنشاء حساب جديد
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    اسم المستخدم
                  </FormLabel>
                  <Input
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="أدخل اسم المستخدم..."
                    size="lg"
                    borderRadius="lg"
                    borderColor="brand.200"
                    _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                    fontFamily="Cairo, sans-serif"
                    bg="white"
                    color="brand.800"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    كلمة المرور
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="أدخل كلمة المرور..."
                      borderRadius="lg"
                      borderColor="brand.200"
                      _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                      fontFamily="Cairo, sans-serif"
                      bg="white"
                      color="brand.800"
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        aria-label="Toggle password visibility"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  size="lg"
                  colorScheme="blue"
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="xl"
                  py={6}
                  onClick={handleSubmit}
                  boxShadow="2xl"
                >
                  تسجيل الدخول
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={6} align="stretch">
                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    اسم المستخدم
                  </FormLabel>
                  <Input
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="أدخل اسم المستخدم..."
                    size="lg"
                    borderRadius="lg"
                    borderColor="brand.200"
                    _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                    fontFamily="Cairo, sans-serif"
                    bg="white"
                    color="brand.800"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    البريد الإلكتروني
                  </FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="أدخل البريد الإلكتروني..."
                    size="lg"
                    borderRadius="lg"
                    borderColor="brand.200"
                    _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                    fontFamily="Cairo, sans-serif"
                    bg="white"
                    color="brand.800"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    كلمة المرور
                  </FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="أدخل كلمة المرور..."
                      borderRadius="lg"
                      borderColor="brand.200"
                      _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                      fontFamily="Cairo, sans-serif"
                      bg="white"
                      color="brand.800"
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        aria-label="Toggle password visibility"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="lg" color="#2e53a5" fontWeight="bold">
                    تأكيد كلمة المرور
                  </FormLabel>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="أعد إدخال كلمة المرور..."
                    size="lg"
                    borderRadius="lg"
                    borderColor="brand.200"
                    _focus={{ borderColor: "#2e53a5", boxShadow: "0 0 0 2px #2e53a5" }}
                    fontFamily="Cairo, sans-serif"
                    bg="white"
                    color="brand.800"
                  />
                </FormControl>

                <Button
                  size="lg"
                  colorScheme="green"
                  borderRadius="xl"
                  fontWeight="bold"
                  fontSize="xl"
                  py={6}
                  onClick={handleSubmit}
                  boxShadow="2xl"
                >
                  إنشاء حساب
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Login; 