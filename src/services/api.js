const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const data = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    setAuthToken(data.token);
    return data;
  },

  // Login user
  login: async (credentials) => {
    const data = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setAuthToken(data.token);
    return data;
  },

  // Logout user
  logout: () => {
    setAuthToken(null);
  },

  // Get user profile
  getProfile: async () => {
    return await apiRequest('/users/profile');
  },
};

// User API functions
export const userAPI = {
  // Update user credits
  updateCredits: async (freeGames, paidCredits) => {
    return await apiRequest('/users/credits', {
      method: 'PUT',
      body: JSON.stringify({ freeGames, paidCredits }),
    });
  },

  // Use a credit
  useCredit: async () => {
    return await apiRequest('/users/use-credit', {
      method: 'POST',
    });
  },

  // Add paid credits
  addPaidCredits: async (amount) => {
    return await apiRequest('/users/add-credits', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  },
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};

// Get current auth token
export const getCurrentToken = () => {
  return getAuthToken();
}; 