import { Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

import React, { useContext, useEffect, useReducer } from 'react';
import { Store } from '../components/Providers/StoreProvider';
import { ActionType } from '../utils/Store/Store';
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAIL = 'FETCH_FAIL';
type StateType = {
  loading: boolean;
  error: string;
  orders: any;
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
      const { data } = await axios.get('/api/admin/orders', {
        headers: { obj1: 'med', obj2: 'riad', obj3: 'mosaab' },
      });
      console.log(data);
      dispatch({ type: FETCH_SUCCESS, payload: data });
    };
    FetchData();
  }, []);
  return (
    <div>
      <h1>Hello shipping you are {state.userInfo?.name} </h1>
      <Typography variant='h3'>
        {Object.values(orders).map((order, index) => (
          <Typography key={index}>{order}</Typography>
        ))}
      </Typography>
    </div>
  );
}

export default Shipping;
