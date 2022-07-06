import {
  Button,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
  Card,
  Box,
  Container,
} from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { ProductTypes } from '../../components/Product';
import data from '../../utils/data';
import NextLink from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../../components/Providers/StoreProvider';
import { CART_ADD_ITEM } from '../../utils/Store/Store';
type PropsTypes = {
  product: ProductTypes;
};
function Product({ product }: PropsTypes) {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = () => {
    dispatch({ type: CART_ADD_ITEM, payload: product });
  };
  return (
    <div>
      <Head>
        <meta name='description' content={product.description} />
      </Head>
      <Box sx={{ marginBottom: '2rem', marginTop: '2rem' }}>
        {' '}
        <NextLink href='/' passHref>
          <Link variant='button'>back to products</Link>
        </NextLink>
      </Box>
      <Grid container columnSpacing={4}>
        {/* 1 */}
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive'
          ></Image>
        </Grid>
        {/* 2 */}
        <Grid item md={3} xs={12}>
          <List>
            <ListItem sx={{ marginBottom: '2rem' }}>
              <Typography component='h1' variant='h1'>
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link href='#reviews'>
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        {/* 3 */}
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>

      <Container>
        <Typography>
          {state.cart.paymentMethod}
          {state.cart.cartItems.map((item: any, index: number) => (
            <Typography key={index}>{item.name}</Typography>
          ))}
        </Typography>
      </Container>
    </div>
  );
}

export default Product;

export const getStaticPaths = () => {
  const { products } = data;
  const paths = products.map((product) => {
    return { params: { slug: product.slug } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  const slug = params?.slug;
  const { products } = data;
  const product = products.filter((product) => product.slug == slug)[0];
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product },
  };
};
