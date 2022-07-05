import { AppBar, Switch, ThemeProvider, Toolbar } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';

import darkTheme from '../../utils/Theme';
import ThemeContext from '../../utils/ThemeContext';

function LayoutAppBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleDarkModeToggle = () => toggleTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        position='static'
        sx={{
          backgroundColor: '#203040',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        <Toolbar>
          <NextLink href={'/'} passHref>
            <a>Ecommerce Web App</a>
          </NextLink>

          <div style={{ flexGrow: 1 }} />
          <Switch
            checked={theme === 'dark'}
            onChange={handleDarkModeToggle}
            sx={{ marginRight: '3rem' }}
          >
            {' '}
            Theme:{theme}
          </Switch>
          <NextLink href={'/cart'} passHref>
            <a style={{ marginRight: '3rem' }}>Cart</a>
          </NextLink>
          <NextLink href={'/login'} passHref>
            <a style={{ marginRight: '3rem' }}>Login</a>
          </NextLink>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default LayoutAppBar;
