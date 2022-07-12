import { Button, Container, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Product, { ProductTypes } from '../components/Product';
import { Store } from '../components/Providers/StoreProvider';

import data from '../utils/data';
import { CART_ADD_ITEM, USER_LOGOUT } from '../utils/Store/Store';

type AddToCartHandlerType = (product: ProductTypes) => void;
type PropsType = {
  products: ProductTypes[];
};
const Home: NextPage<PropsType> = ({ products }: PropsType) => {
  const { dispatch } = useContext(Store);
  const router = useRouter();
  const addToCartHandler: AddToCartHandlerType = (product: ProductTypes) => {
    dispatch({ type: CART_ADD_ITEM, payload: product });
    router.push('/cart');
  };
  const handleLogout = () => {
    dispatch({ type: USER_LOGOUT });
  };
  return (
    <Container>
      <Button onClick={handleLogout}>Log Out</Button>
      <Typography variant='h4'>Home page</Typography>
      <Grid container spacing={3}>
        {products.map((product) => {
          return (
            <Grid md={4} key={product.name} item>
              <Product product={product} addToCartHandler={addToCartHandler} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Home;

export const getServerSideProps = () => {
  const { products } = data;
  return {
    props: { products },
  };
};
