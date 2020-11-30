import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import product2 from "../assets/images/product2.jpeg";

function CartItem({ cart, handleRemove }) {

  return (
    <div className="w-full h-40 flex text-base items-center px-10">
      <img
        className="h-32 w-32 object-cover object-center shadow-2xl rounded-md mr-2"
        src={cart.photo}
        alt={"Ice Coffe with Choco"}
      />
      <div className="w-8/12 h-16 flex flex-col justify-between">
        <h3 className="font-bold">{cart.title}</h3>
        <h3>
          <span className="font-bold text-red-800">Toping</span> :
          {cart.topings
            ? cart.topings.map((toping) => (
                <span className="text-sm">{toping.title}, </span>
              ))
            : ""}
        </h3>
      </div>

      <div className="w-2/12 h-16 flex flex-col justify-between items-end">
        <h3>{cart.price}</h3>
        <button onClick={() => handleRemove(cart.id)}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
