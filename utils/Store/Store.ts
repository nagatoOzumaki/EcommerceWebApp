export const CART_ADD_ITEM = 'ADD_TO_CART';
export const DARK_MODE_ON = 'DARK_MODE_ON';
export const DARK_MODE_OFF = 'DARK_MODE_OFF';
export const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';
export const SAVE_SHIPPING_ADDRESS_MAP_LOCATION =
  'SAVE_SHIPPING_ADDRESS_MAP_LOCATION';
export const SAVE_PAYMENT_METHOD = 'SAVE_PAYMENT_METHOD';
export const CART_CLEAR = 'CART_CLEAR';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SAVE_SHIPPING_ADDRESS = 'SAVE_SHIPPING_ADDRESS';
export const CART_SET_ITEMS = 'CART_SET_ITEMS';
export type ProductTypes = {
  id: number;
  name: string;
  slug: string;
  category: string;
  image: string;
  isFeatured?: boolean;
  featuredImage?: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
  quantity: number;
};

export type InitialStateType = {
  darkMode: boolean;
  cart: {
    cartItems: ProductTypes[];
    shippingAddress: Object;
    paymentMethod: string;
  };
  userInfo: {
    json?: string;
    name: string;
    username: string;
    isAdmin: boolean;
  } | null;
};
let theme = true;

export const initialState: InitialStateType = {
  darkMode: theme,
  cart: {
    cartItems: [],
    shippingAddress: '',
    paymentMethod: 'bank',
  },
  userInfo: null,
};

export type ActionType = {
  type: string;
  payload?: any;
};
export type StateReducerType = (
  state: InitialStateType,
  action: ActionType
) => InitialStateType;
export const stateReducer: StateReducerType = (
  state: InitialStateType,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case DARK_MODE_ON:
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', JSON.stringify(true));
      }
      return { ...state, darkMode: true };
    case DARK_MODE_OFF:
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', JSON.stringify(false));
      }
      return { ...state, darkMode: false };
    case CART_SET_ITEMS:
      const storedItems = action.payload;
      return { ...state, cart: { ...state.cart, cartItems: storedItems } };
    case CART_ADD_ITEM:
      const ids = state.cart.cartItems.map((item) => item.id);
      let newState = state;
      if (!ids.includes(action.payload.id)) {
        newState = {
          ...state,
          cart: {
            ...state.cart,
            cartItems: [...state.cart.cartItems, action.payload],
          },
        };
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartItems',
          JSON.stringify(newState.cart.cartItems)
        );
      }
      return newState;
    case CART_REMOVE_ITEM:
      console.log('from store');
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      const removeItemState = {
        ...state,
        cart: { ...state.cart, cartItems },
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartItems',
          JSON.stringify(removeItemState.cart.cartItems)
        );
      }
      return removeItemState;
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case SAVE_SHIPPING_ADDRESS_MAP_LOCATION:
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case USER_LOGIN:
      const newUserInfo = action.payload;
      const loginState: InitialStateType = { ...state, userInfo: newUserInfo };
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(loginState.userInfo));
      }
      return loginState;
    case USER_LOGOUT:
      const logoutState: InitialStateType = {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: '',
          paymentMethod: '',
        },
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('userInfo', JSON.stringify(''));
      }
      return logoutState;
    default:
      return state;
  }
};
