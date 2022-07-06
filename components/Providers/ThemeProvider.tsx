import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getTheme, darkTheme, lightTheme } from '../../utils/Theme';
import { Theme } from '@mui/system';
import { Store } from './StoreProvider';
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../utils/Store/Store';
type PropsTypes = {
  children: JSX.Element[] | JSX.Element;
};
function ThemeProvider({ children }: PropsTypes) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme(false));
  const { state } = useContext(Store);
  useEffect(() => {
    setCurrentTheme(getTheme(state.darkMode));
  }, [state.darkMode]);

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
