import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Container,
  Heading,
  useToast,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';
import { getRandomQuestion } from './data/questions';
import GameModal from './components/GameModal';
import ScoreBoard from './components/ScoreBoard';
import TeamSetup from './components/TeamSetup';
import CategorySelection from './components/CategorySelection';
import GameBoard from './components/GameBoard';
import WinnerModal from './components/WinnerModal';
import Login from './components/Login';
import CreditSystem from './components/CreditSystem';
import { authAPI, userAPI, isAuthenticated, getCurrentToken } from './services/api';

function App() {
  const [gameState, setGameState] = useState('auth'); // 'auth', 'setup', 'playing', 'finished'
  const [currentTeam, setCurrentTeam] = useState('Team A');
  const [points, setPoints] = useState({ 'Team A': 0, 'Team B': 0 });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [usedQuestions, setUsedQuestions] = useState(new Set());
  const [teamNames, setTeamNames] = useState({ 'Team A': 'Team A', 'Team B': 'Team B' });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [usedCells, setUsedCells] = useState({});
  const [questionModal, setQuestionModal] = useState({ open: false, question: null, cellKey: null });
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const [user, setUser] = useState(null);
  
  const toast = useToast();
  const testDialog = useDisclosure();
  const cancelRef = React.useRef();

  const teams = Object.values(teamNames);

  // Check for existing user on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
          setGameState('setup');
        } catch (error) {
          console.error('Auth check failed:', error);
          authAPI.logout();
        }
      }
    };
    
    checkAuth();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      const userData = await authAPI.login(loginData);
      setUser(userData);
      setGameState('setup');
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً ${userData.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message || "يرجى التحقق من البيانات",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegister = async (registerData) => {
    try {
      const userData = await authAPI.register(registerData);
      setUser(userData);
      setGameState('setup');
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً ${userData.username}! لديك لعبة مجانية واحدة`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: error.message || "يرجى التحقق من البيانات",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    setGameState('auth');
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لاستخدام التطبيق",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePurchaseCredits = async (creditCode) => {
    // Simple validation - you can implement more sophisticated validation
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

    // Mock credit codes for testing
    const mockCreditCodes = [
      'ABC123DEF456',
      'XYZ789GHI012',
      'MNO345PQR678',
      'STU901VWX234',
      'YZA567BCD890'
    ];

    if (mockCreditCodes.includes(creditCode.toUpperCase())) {
      try {
        const updatedUser = await userAPI.addPaidCredits(5);
        setUser(updatedUser);
        toast({
          title: "تم شراء الرصيد بنجاح",
          description: "تم إضافة 5 ألعاب إلى رصيدك",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "خطأ في شراء الرصيد",
          description: error.message || "يرجى المحاولة مرة أخرى",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "كود غير صالح",
        description: "يرجى إدخال كود صحيح",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const checkUserCredits = () => {
    if (user.freeGames > 0) {
      return true;
    }
    if (user.paidCredits > 0) {
      return true;
    }
    return false;
  };

  const useCredit = async () => {
    try {
      const updatedUser = await userAPI.useCredit();
      setUser(updatedUser);
    } catch (error) {
      toast({
        title: "خطأ في استخدام الرصيد",
        description: error.message || "يرجى المحاولة مرة أخرى",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

  const handleTeamSetup = (customTeamNames) => {
    // Check if user has credits
    if (!checkUserCredits()) {
      toast({
        title: "لا يوجد رصيد كافي",
        description: "يرجى شراء رصيد للعب",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setTeamNames(customTeamNames);
    setGameState('category-selection');
  };

  const handleCategorySelection = (categories) => {
    setSelectedCategories(categories);
    setGameState('playing');
    setPoints({ [teamNames['Team A']]: 0, [teamNames['Team B']]: 0 });
    setQuestionsAnswered(0);
    setUsedQuestions(new Set());
    setCurrentTeam(teamNames['Team A']);
    getNewQuestion();
    
    // Use a credit when starting the game
    useCredit();
  };

  const getNewQuestion = () => {
    let newQuestion;
    let attempts = 0;
    
    // Try to get a question that hasn't been used
    do {
      newQuestion = getRandomQuestion(selectedCategories);
      attempts++;
    } while (newQuestion && usedQuestions.has(newQuestion.id) && attempts < 50);
    
    if (!newQuestion) {
      toast({
        title: "لا توجد أسئلة متاحة",
        description: "تم استخدام جميع الأسئلة من الفئات المختارة",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setCurrentQuestion(newQuestion);
    setUsedQuestions(prev => new Set([...prev, newQuestion.id]));
  };

  const handleAnswerSubmit = (answer) => {
    const isCorrect = answer.toLowerCase() === currentQuestion.answer.toLowerCase();
    const pointsToAdd = getPointsForDifficulty(currentQuestion.difficulty);
    
    if (isCorrect) {
      setPoints(prev => ({
        ...prev,
        [currentTeam]: prev[currentTeam] + pointsToAdd
      }));
      
      toast({
        title: "صحيح!",
        description: `+${pointsToAdd} نقطة لـ ${currentTeam}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "خطأ!",
        description: `الإجابة الصحيحة كانت: ${currentQuestion.answer}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    // Switch teams
    const currentTeamIndex = teams.indexOf(currentTeam);
    const nextTeam = teams[(currentTeamIndex + 1) % teams.length];
    setCurrentTeam(nextTeam);
    
    // Update question count
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    
    // Check if game is over
    if (newQuestionsAnswered >= totalQuestions) {
      setGameState('finished');
      setIsModalOpen(true);
    } else {
      getNewQuestion();
    }
    
    setIsModalOpen(false);
  };

  const handleSkipQuestion = () => {
    // Switch teams without adding points
    const currentTeamIndex = teams.indexOf(currentTeam);
    const nextTeam = teams[(currentTeamIndex + 1) % teams.length];
    setCurrentTeam(nextTeam);
    
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);
    
    if (newQuestionsAnswered >= totalQuestions) {
      setGameState('finished');
      setIsModalOpen(true);
    } else {
      getNewQuestion();
    }
    
    setIsModalOpen(false);
  };

  const resetGame = () => {
    setGameState('setup');
    setPoints({ 'Team A': 0, 'Team B': 0 });
    setQuestionsAnswered(0);
    setUsedQuestions(new Set());
    setCurrentQuestion(null);
    setIsModalOpen(false);
    setTeamNames({ 'Team A': 'Team A', 'Team B': 'Team B' });
    setSelectedCategories([]);
  };

  const openQuestionModal = () => {
    if (gameState === 'playing') {
      setIsModalOpen(true);
    }
  };

  // Helper to get selected category objects
  const selectedCategoryObjects = selectedCategories.map(
    id => require('./data/categories').categories.find(c => c.id === id)
  );

  // Handle cell click to show a question
  const handleBoardCellClick = (category, difficulty, slot) => {
    // Map category ID to category name for questions lookup
    const categoryNameMap = {
      1: "Geography",
      2: "Science", 
      3: "History",
      4: "Literature",
      5: "Art",
      6: "Mathematics",
      7: "Sports",
      8: "Music",
      9: "Movies",
      10: "Technology",
      11: "Food & Cooking",
      12: "Animals",
      13: "Space",
      14: "Politics"
    };
    
    // For now, let's use the available categories from questions
    const availableCategories = ["Games", "History", "Math"];
    const categoryName = availableCategories[category.id % availableCategories.length] || "Games";
    
    // Get all questions from the selected category
    const categoryQuestions = require('./data/questions').default.find(
      cat => cat.category === categoryName
    );
    
    if (!categoryQuestions) {
      toast({
        title: "الفئة غير موجودة",
        description: `لا توجد أسئلة للفئة: ${categoryName}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Get questions for this difficulty level
    const difficultyPoints = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 300 : 500;
    const allQuestions = categoryQuestions.questions.filter(q => q.points === difficultyPoints);
    
    // Find which questions have already been used for this category/difficulty
    const usedForCell = Object.values(usedCells).filter(
      u => u && u.category === categoryName && u.points === difficultyPoints
    );
    
    const unusedQuestions = allQuestions.filter(
      q => !usedForCell.some(uq => uq.id === q.id)
    );
    
    if (unusedQuestions.length === 0) {
      toast({
        title: "لا توجد أسئلة أخرى",
        description: `تم استخدام جميع الأسئلة لـ ${categoryName} (${difficulty}).`,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Pick a random unused question
    const question = unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
    // Add category and difficulty info to the question
    const questionWithMeta = {
      ...question,
      categoryId: category.id,
      category: categoryName,
      difficulty: difficulty
    };
    setQuestionModal({ open: true, question: questionWithMeta, cellKey: `${category.id}-${difficulty}-${slot}` });
  };

  // Handle answer submit for board modal
  const handleBoardAnswerSubmit = (answer) => {
    const { question, cellKey } = questionModal;
    const isCorrect = answer.toLowerCase() === question.answer.toLowerCase();
    const pointsToAdd = getPointsForDifficulty(question.difficulty);
    if (isCorrect) {
      setPoints(prev => ({ ...prev, [currentTeam]: prev[currentTeam] + pointsToAdd }));
      toast({
        title: "صحيح!",
        description: `+${pointsToAdd} نقطة لـ ${currentTeam}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "خطأ!",
        description: `الإجابة الصحيحة كانت: ${question.answer}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setUsedCells(prev => ({ ...prev, [cellKey]: question }));
    // Switch teams
    const currentTeamIndex = teams.indexOf(currentTeam);
    const nextTeam = teams[(currentTeamIndex + 1) % teams.length];
    setCurrentTeam(nextTeam);
    setQuestionModal({ open: false, question: null, cellKey: null });
  };

  // Detect when all questions are answered
  React.useEffect(() => {
    const totalCells = selectedCategoryObjects.length * 6;
    if (gameState === 'playing' && Object.keys(usedCells).length === totalCells) {
      // Find winner
      const maxScore = Math.max(...Object.values(points));
      const winner = Object.keys(points).find(team => points[team] === maxScore);
      setWinnerName(winner);
      setWinnerModalOpen(true);
    }
  }, [usedCells, gameState, selectedCategoryObjects.length, points]);

  return (
    <ChakraProvider>
      <Box 
        minH="100vh" 
        bgImage="url('/bg.jpg')"
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        fontFamily="Cairo, sans-serif"
        position="relative"
      >
        
        {/* Content container with higher z-index */}
        <Box position="relative" zIndex={1}>
          {/* Fixed Scoreboard Navbar */}
          {gameState === 'playing' && (
            <ScoreBoard
              points={points}
              currentTeam={currentTeam}
              questionsAnswered={Object.keys(usedCells).length}
              totalQuestions={selectedCategoryObjects.length * 6}
            />
          )}

          {/* Main Content with top padding for navbar */}
          <Box pt={gameState === 'playing' ? "80px" : "0"}>
            <Container maxW="container.xl" py={8}>
              <VStack spacing={8} align="stretch">
                {/* Game Controls */}
                {gameState === 'auth' && (
                  <Login onLogin={handleLogin} onRegister={handleRegister} />
                )}
                {gameState === 'setup' && user && (
                  <HStack spacing={8} align="flex-start" justify="center">
                    <CreditSystem 
                      user={user} 
                      onPurchaseCredits={handlePurchaseCredits} 
                      onLogout={handleLogout} 
                    />
                    <TeamSetup onStartGame={handleTeamSetup} />
                  </HStack>
                )}

                {/* Category Selection */}
                {gameState === 'category-selection' && (
                  <CategorySelection onCategoriesSelected={handleCategorySelection} />
                )}

                {/* Game Board */}
                {gameState === 'playing' && (
                  <>
                    <GameBoard
                      categories={selectedCategoryObjects}
                      questions={require('./data/questions').questions}
                      onCellClick={handleBoardCellClick}
                      usedCells={usedCells}
                    />
                    {/* Test Button for Winner Popup */}
                    <Box textAlign="center" mt={4}>
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={testDialog.onOpen}
                      >
                        اختبار إكمال اللوحة (عرض الفائز)
                      </Button>
                      <AlertDialog
                        isOpen={testDialog.isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={testDialog.onClose}
                      >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            إكمال اللوحة للاختبار؟
                          </AlertDialogHeader>
                          <AlertDialogBody>
                            سيتم الإجابة على جميع الأسئلة المتبقية بشكل عشوائي وعرض نافذة الفائز. هل أنت متأكد؟
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={testDialog.onClose}>
                              إلغاء
                            </Button>
                            <Button colorScheme="blue" onClick={() => {
                              // Get all unanswered cells
                              const totalCells = selectedCategoryObjects.length * 6;
                              const unanswered = [];
                              
                              selectedCategoryObjects.forEach(cat => {
                                ['easy', 'medium', 'hard'].forEach(diff => {
                                  for (let slot = 0; slot < 2; slot++) {
                                    const cellKey = `${cat.id}-${diff}-${slot}`;
                                    if (!usedCells[cellKey]) {
                                      // Find unused question for this cell
                                      const usedForCell = Object.values(usedCells).filter(
                                        u => u && u.category === cat.name && u.points === (diff === 'easy' ? 100 : diff === 'medium' ? 300 : 500)
                                      );
                                      
                                      // Get questions from the correct category
                                      const categoryQuestions = require('./data/questions').default.find(
                                        catQ => catQ.category === cat.name
                                      );
                                      
                                      if (categoryQuestions) {
                                        const difficultyPoints = diff === 'easy' ? 100 : diff === 'medium' ? 300 : 500;
                                        const allQuestions = categoryQuestions.questions.filter(q => q.points === difficultyPoints);
                                        const unusedQuestions = allQuestions.filter(
                                          q => !usedForCell.some(uq => uq.id === q.id)
                                        );
                                        
                                        if (unusedQuestions.length > 0) {
                                          unanswered.push({ 
                                            cellKey, 
                                            cat, 
                                            diff, 
                                            slot, 
                                            question: unusedQuestions[0] 
                                          });
                                        }
                                      }
                                    }
                                  }
                                });
                              });
                              
                              // Randomly assign answers, but ensure one team wins
                              let testPoints = { ...points };
                              let testUsedCells = { ...usedCells };
                              let testTeam = currentTeam;
                              
                              const diffToPoints = (diff) => {
                                return diff === 'easy' ? 100 : diff === 'medium' ? 300 : 500;
                              };
                              
                              unanswered.forEach((cell, idx) => {
                                // Alternate teams, but bias last answer to Team A for a win
                                if (idx === unanswered.length - 1) {
                                  testTeam = Object.keys(testPoints)[0]; // Team A
                                } else if (idx === unanswered.length - 2) {
                                  testTeam = Object.keys(testPoints)[1]; // Team B
                                } else {
                                  testTeam = idx % 2 === 0 ? Object.keys(testPoints)[0] : Object.keys(testPoints)[1];
                                }
                                // Randomly decide if correct or not (but always correct for last answer)
                                const isCorrect = idx === unanswered.length - 1 || Math.random() > 0.3;
                                if (isCorrect) {
                                  const pointsToAdd = diffToPoints(cell.diff);
                                  testPoints[testTeam] = (testPoints[testTeam] || 0) + pointsToAdd;
                                }
                                testUsedCells[cell.cellKey] = cell.question;
                              });
                              setPoints(testPoints);
                              setUsedCells(testUsedCells);
                              testDialog.onClose();
                            }} ml={3}>
                              نعم، إكمال اللوحة
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Box>
                  </>
                )}

                {/* Game Over */}
                {gameState === 'finished' && (
                  <Box textAlign="center">
                    <VStack spacing={6}>
                      <Text fontSize="2xl" color="gray.800" fontWeight="normal">
                        انتهت اللعبة!
                      </Text>
                      <Text fontSize="lg" color="gray.600" fontWeight="normal">
                        تم حساب النقاط النهائية.
                      </Text>
                      <Button
                        bg="#2e53a5"
                        color="white"
                        onClick={resetGame}
                        _hover={{ bg: "#1e3a7a" }}
                        fontWeight="normal"
                      >
                        العب مرة أخرى
                      </Button>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </Container>
          </Box>

          {/* Game Modal for Board */}
          <GameModal
            isOpen={questionModal.open}
            onClose={() => setQuestionModal({ open: false, question: null, cellKey: null })}
            currentQuestion={questionModal.question}
            onTeamCorrect={(team) => {
              const { question, cellKey } = questionModal;
              const pointsToAdd = getPointsForDifficulty(question.difficulty);
              setPoints(prev => ({ ...prev, [team]: prev[team] + pointsToAdd }));
              setUsedCells(prev => ({ ...prev, [cellKey]: question }));
              // Switch teams
              const currentTeamIndex = teams.indexOf(team);
              const nextTeam = teams[(currentTeamIndex + 1) % teams.length];
              setCurrentTeam(nextTeam);
              setQuestionModal({ open: false, question: null, cellKey: null });
            }}
            teamNames={teams}
            points={points}
            gameState={gameState}
          />
          {/* Winner Modal */}
          <WinnerModal
            isOpen={winnerModalOpen}
            onClose={() => { setWinnerModalOpen(false); resetGame(); }}
            winner={winnerName}
            points={points}
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

function diffToPoints(diff) {
  if (diff === 'easy') return 100;
  if (diff === 'medium') return 300;
  if (diff === 'hard') return 500;
  return 0;
}

export default App; 