import { AppBar, Grid, Switch, Toolbar, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import { DARK_MODE_OFF, DARK_MODE_ON } from '../../utils/Store/Store';
import { Store } from '../Providers/StoreProvider';
function LayoutAppBar() {
  const { state, dispatch } = useContext(Store);

  const handleDarkModeToggle = () => {
    dispatch({ type: state.darkMode ? DARK_MODE_OFF : DARK_MODE_ON });
  };

  return (
    // <ThemeProvider theme={darkTheme}>

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
          checked={state.darkMode}
          onChange={handleDarkModeToggle}
        ></Switch>
        <Typography
          variant='body1'
          sx={{ marginRight: '3rem', fontWeight: 'bold' }}
        >
          {state.darkMode ? 'dark' : 'light'}
        </Typography>
        <NextLink href={'/cart'} passHref>
          <a>
            <Grid item sx={{ marginRight: '3rem', fontWeight: 'bold' }}>
              <Grid item sm={12}>
                <Typography>{state.cart.cartItems.length}</Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography>Cart</Typography>
              </Grid>
            </Grid>
          </a>
        </NextLink>
        <NextLink href={'/login'} passHref>
          <a style={{ marginRight: '3rem' }}>Login</a>
        </NextLink>
      </Toolbar>
    </AppBar>
    // </ThemeProvider>
  );
}

export default LayoutAppBar;
