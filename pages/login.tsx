import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

import { USER_LOGIN } from '../utils/Store/Store';
import { Store } from '../components/Providers/StoreProvider';
import data from '../utils/data';

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    return async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      e.preventDefault();
      try {
        const users = data.users;
        users.map((user) => {
          if (user.email == username && user.password == password) {
            dispatch({ type: USER_LOGIN, payload: { ...user } });
            router.push((redirect as unknown as string) || '/');
          }
        });
      } catch (err) {
        setError(true);
      }
    };
  };
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)(login)}>
        <Typography component='h1' variant='h1'>
          Login
        </Typography>
        <List sx={{ padding: '3rem' }}>
          <ListItem>
            <TextField
              name='username'
              type='email'
              onChange={(e) => setLogin({ ...login, username: e.target.value })}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              name='password'
              type='password'
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don &apos; t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </>
  );
}
