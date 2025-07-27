import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Cairo, Helvetica, Arial, sans-serif',
    body: 'Cairo, Helvetica, Arial, sans-serif',
  },
  colors: {
    brand: {
      50: '#e0e7ff',
      100: '#b7bffb',
      200: '#8e97f7',
      300: '#6570f3',
      400: '#3c48ef',
      500: '#2e53a5', // main button color
      600: '#232e6b',
      700: '#1a2047',
      800: '#101223',
      900: '#080a11',
    },
    accent: {
      100: '#ffb6b9',
      200: '#fcd34d',
      300: '#6ee7b7',
      400: '#f472b6',
      500: '#f87171',
    },
  },
  radii: {
    none: '0',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: 'lg',
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 'lg',
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'xl',
        },
      },
    },
    Card: {
      baseStyle: {
        borderRadius: 'xl',
        boxShadow: '2xl',
      },
    },
  },
});

export default theme; 