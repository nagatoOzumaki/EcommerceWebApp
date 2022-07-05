import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import LayoutAppBar from './LayoutAppBar';

type PropsType = {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
};

function Layout({ children, title, description }: PropsType) {
  return (
    <>
      <Head>
        <title>{title ? title : 'Ecommerce'}</title>
      </Head>
      <LayoutAppBar />
      {/*---------------main----------------------------- */}
      <Container sx={{ minHeight: '80vh' }}>{children}</Container>
      {/* -------------------------footer-----------------------------*/}
      <Box
        sx={{
          dispaly: 'flex',
          justifyContent: 'center',
          backgroundColor: '#ddd',
          marginTop: '10vh',
          padding: '10vh',
        }}
      >
        <Typography>All rights reserved .Next Js</Typography>
      </Box>
    </>
  );
}

export default Layout;
