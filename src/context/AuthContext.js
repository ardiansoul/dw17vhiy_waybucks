import Axios from "axios";
import { createContext, useReducer } from "react";
import { baseUrl } from "../Utils/API";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  role: "",
  carts: [],
  error: "",
};
console.log(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        role: action.payload.role,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        role: "",
      };
    case "RESET_CART":
      return {
        ...state,
        carts: [],
      };
    case "ADD_CART":
      let cartId = state.carts.length + 1;

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            cartId: cartId,
            ...action.payload,
          },
        ],
      };
    case "TRANS_SUBMIT":
      return {
        ...state,
        carts: [],
      };
    case "REMOVE_CART":
      // const removeById = state.carts.filter(
      //   (cart) => cart.cartId !== action.payload
      // );
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.cartId !== action.payload),
      };

    case "USER_LOADED":
      // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        role: action.payload.role,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
