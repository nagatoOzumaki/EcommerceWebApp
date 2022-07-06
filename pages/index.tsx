import { Container, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Product, { ProductTypes } from '../components/Product';
import styles from '../styles/Home.module.css';
import data from '../utils/data';

type AddToCartHandlerType = (product: ProductTypes) => void;
type PropsType = {
  products: ProductTypes[];
};
const Home: NextPage<PropsType> = ({ products }: PropsType) => {
  const addToCartHandler: AddToCartHandlerType = (product: ProductTypes) => {};
  return (
    <Container>
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
