import {
  cartReducer,
  CartReducerType,
  DARK_MODE_OFF,
  DARK_MODE_ON,
  initialState,
  InitialStateType,
} from '../../utils/Store/Store';
import { useReducer, createContext, useEffect } from 'react';

type ContextType = { state: InitialStateType; dispatch: any };
const initialeStore: ContextType = { state: initialState, dispatch: null };

export const Store = createContext(initialeStore);

function StoreProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      const theme = storedTheme ? JSON.parse(storedTheme) : false;
      dispatch({ type: theme ? DARK_MODE_ON : DARK_MODE_OFF });
    }
  }, []);
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}

export default StoreProvider;
