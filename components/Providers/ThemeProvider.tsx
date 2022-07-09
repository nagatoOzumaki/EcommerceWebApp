import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getTheme } from '../../utils/Theme';
import { Theme } from '@mui/system';
import { Store } from './StoreProvider';

import { CART_SET_ITEMS } from '../../utils/Store/Store';

type PropsTypes = {
  children: JSX.Element[] | JSX.Element;
};
function ThemeProvider({ children }: PropsTypes) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getTheme(false));
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    let storedItems = [];
    if (typeof window !== 'undefined') {
      const str = localStorage.getItem('cartItems');
      storedItems = str ? JSON.parse(str) : [];
      dispatch({ type: CART_SET_ITEMS, payload: storedItems });
    }
  }, [dispatch]);

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
