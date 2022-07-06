import { createMuiTheme } from '@mui/material';

export const lightTheme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#f0c000',
    },
    secondary: {
      main: '#208080',
    },
  },
});
export const darkTheme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '1.6rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
    h2: {
      fontSize: '1.4rem',
      fontWeight: 400,
      margin: '1rem 0',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#f0c000',
    },
    secondary: {
      main: '#208080',
    },
  },
});
export const getTheme = (isDarkMode: boolean) =>
  isDarkMode ? darkTheme : lightTheme;

export default lightTheme;
