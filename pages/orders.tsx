import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../components/Providers/StoreProvider';
import getError from '../utils/error';
import { ActionType } from '../utils/Store/Store';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';

type orderType = {
  user: { type: string; ref: 'User'; required: true };
  orderItems: [
    {
      name: { type: String; required: true };
      quantity: { type: Number; required: true };
      image: { type: String; required: true };
      price: { type: Number; required: true };
    }
  ];
  shippingAddress: {
    fullName: { type: String; required: true };
    address: { type: String; required: true };
    city: { type: String; required: true };
    postalCode: { type: String; required: true };
    country: { type: String; required: true };
    location: {
      lat: String;
      lng: String;
      address: String;
      name: String;
      vicinity: String;
      googleAddressId: String;
    };
  };
  paymentMethod: { type: String; required: true };
  paymentResult: { id: String; status: String; email_address: String };
  itemsPrice: { type: Number; required: true };
  shippingPrice: { type: Number; required: true };
  taxPrice: { type: Number; required: true };
  totalPrice: { type: Number; required: true };
  isPaid: { type: Boolean; required: true; default: false };
  isDelivered: { type: Boolean; required: true; default: false };
  paidAt: { type: Date };
  deliveredAt: { type: Date };
  timestamps: true;
};

type StateType = {
  loading: boolean;
  error: string;
  orders: orderType[];
};
export type ReducerType = (state: StateType, action: ActionType) => StateType;

export const reducer: ReducerType = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true, error: '' };
    case FETCH_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: '' };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
// const initialState = { orders: [], error: '', loading: true };
function Shipping() {
  const { state } = useContext(Store);

  const [{ orders, error, loading }, dispatch] = useReducer(reducer, {
    orders: [],
    error: '',
    loading: true,
  });
  const { userInfo } = state;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/orders');
    }
    const FetchData = async () => {
      try {
        const { data } = await axios.get('/api/admin/orders', {
          headers: { Authorisation: 'token' },
        });

        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (err) {
        dispatch({ type: FETCH_FAIL, payload: getError(err) });
      }
    };
    FetchData();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item md={3} xs={12}>
        <Card>
          <List>
            <NextLink href='/profile' passHref>
              <ListItem button component='a'>
                <ListItemText primary='User Profile'></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href='/order-history' passHref>
              <ListItem selected button component='a'>
                <ListItemText primary='Order History'></ListItemText>
              </ListItem>
            </NextLink>
          </List>
        </Card>
      </Grid>
      <Grid item md={9} xs={12}>
        <Card>
          <List>
            <ListItem>
              <Typography component='h1' variant='h1'>
                Order History
              </Typography>
            </ListItem>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography>{error}</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>DATE</TableCell>
                        <TableCell>TOTAL</TableCell>
                        <TableCell>PAID</TableCell>
                        <TableCell>DELIVERED</TableCell>
                        <TableCell>ACTION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order: any) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id.substring(20, 24)}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell>
                            {order.isPaid
                              ? `paid at ${order.paidAt}`
                              : 'not paid'}
                          </TableCell>
                          <TableCell>
                            {order.isDelivered
                              ? `delivered at ${order.deliveredAt}`
                              : 'not delivered'}
                          </TableCell>
                          <TableCell>
                            <NextLink href={`/order/${order._id}`} passHref>
                              <Button variant='contained'>Details</Button>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Shipping;
