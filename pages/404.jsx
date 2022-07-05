import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

function NotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => router.push('/'), 10000);
  }, []);
  return (
    <Box>
      <Typography>Error page </Typography>
      <NextLink href='/s'>
        {/* 
            errorrrrr
            Unhandled Runtime Error

Error: Invariant: attempted to hard navigate to the same URL /s http://localhost:3000/s
        
        */}
        <Link>Home</Link>
      </NextLink>
    </Box>
  );
}

export default NotFound;
