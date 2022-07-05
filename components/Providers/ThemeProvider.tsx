import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import ThemeContext from '../../utils/ThemeContext';
// import Theme, { fetchTheme, getTheme } from '../../utils/Theme';
import { getTheme } from '../../utils/Theme';
import { Theme } from '@mui/system';
type PropsTypes = {
  children: JSX.Element[] | JSX.Element;
};
function ThemeProvider({ children }: PropsTypes) {
  // const theme = fetchTheme() && fetchTheme() !== '' ? fetchTheme() : 'light';
  const theme = 'light';
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme(theme));
  const [selectedTheme, setSelectedTheme] = useState<string>('light');

  const toggleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    setCurrentTheme(getTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider value={{ theme: selectedTheme, toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        <CssBaseline />

        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
