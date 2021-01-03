import { useContext } from "react";
import { AppContext } from "../context/AuthContext";
import CartItem from "./CartItem";

function CartList() {
  const [state, dispatch] = useContext(AppContext);

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: id,
    });
  };
  return (
    <div
      className="overflow-auto"
      style={{
        maxHeight: "350px",
      }}
    >
      {state.carts.map((cart, index) => (
        <CartItem cart={cart} key={index} handleRemove={handleRemove} />
      ))}
    </div>
  );
}

export default CartList;
