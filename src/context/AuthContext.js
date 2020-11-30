import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  role: "",
  carts: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        role: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        role: "",
      };
    case "ADD_CART":
      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...action.payload,
          },
        ],
      };
      case "REMOVE_CART":
        return {
          ...state,
          carts: [
          ]
        }
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
