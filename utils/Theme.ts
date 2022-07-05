import { createMuiTheme } from '@mui/material';

const lightTheme = createMuiTheme({
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
const darkTheme = createMuiTheme({
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
export const getTheme = (theme: any) =>
  theme === 'dark' ? darkTheme : lightTheme;
// export const storeTheme = (theme: any) =>
//   localStorage.setItem('theme', theme.toString());
// export const fetchTheme = () => {
//   const storedTeme = localStorage.getItem('theme')
//     ? localStorage.getItem('theme')
//     : '';
//   if (storedTeme === 'dark') {
//     return 'dark';
//   } else {
//     return 'light';
//   }
// };

export default lightTheme;
