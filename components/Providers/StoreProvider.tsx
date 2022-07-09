import {
  stateReducer,
  DARK_MODE_OFF,
  DARK_MODE_ON,
  initialState,
  InitialStateType,
  USER_LOGIN,
} from '../../utils/Store/Store';
import { useReducer, createContext, useEffect } from 'react';
import { CART_SET_ITEMS } from '../../utils/Store/Store';
type ContextType = { state: InitialStateType; dispatch: any };
const initialeStore: ContextType = { state: initialState, dispatch: null };

export const Store = createContext(initialeStore);

function StoreProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // theme
      const storedTheme = localStorage.getItem('theme');
      const theme = storedTheme ? JSON.parse(storedTheme) : false;
      dispatch({ type: theme ? DARK_MODE_ON : DARK_MODE_OFF });
      // cart items
      const storedCartItems = localStorage.getItem('cartItems');
      const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      dispatch({ type: CART_SET_ITEMS, payload: cartItems });
      // user info
      const storedUserInfo = localStorage.getItem('userInfo');
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      dispatch({ type: USER_LOGIN, payload: userInfo });
    }
  }, []);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export default StoreProvider;
