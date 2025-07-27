// User data storage utilities
export const saveUser = (user) => {
  localStorage.setItem('triviaUser', JSON.stringify(user));
};

export const getUser = () => {
  const userData = localStorage.getItem('triviaUser');
  return userData ? JSON.parse(userData) : null;
};

export const removeUser = () => {
  localStorage.removeItem('triviaUser');
};

export const updateUserCredits = (freeGames, paidCredits) => {
  const user = getUser();
  if (user) {
    user.freeGames = freeGames;
    user.paidCredits = paidCredits;
    saveUser(user);
  }
  return user;
};

// Credit code validation (you can implement your own logic)
export const validateCreditCode = (code) => {
  // Simple validation - you can make this more sophisticated
  if (code.length < 8) return false;
  
  // Check if code contains at least 2 letters and 2 numbers
  const hasLetters = /[A-Za-z]/.test(code);
  const hasNumbers = /[0-9]/.test(code);
  
  return hasLetters && hasNumbers;
};

// Generate a random credit code for testing
export const generateCreditCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Mock credit codes for testing (in real app, these would come from a database)
export const mockCreditCodes = [
  'ABC123DEF456',
  'XYZ789GHI012',
  'MNO345PQR678',
  'STU901VWX234',
  'YZA567BCD890'
]; 