import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { priceFormatter } from "../Utils/priceFormatter";

function CartItem({ cart, handleRemove }) {
  console.log("cartitem", cart);
  return (
    <div className="w-full h-40 flex text-base items-center px-10">
      <img
        className="h-32 w-32 object-cover object-center shadow-2xl rounded-md mr-2"
        src={cart.photo}
        alt={"Ice Coffe with Choco"}
      />
      <div className="w-8/12 h-16 flex flex-col justify-between">
        <h3 className="font-bold">{cart.name}</h3>
        <h3>
          <span className="font-bold text-red-800">Toping</span> :
          {cart.topings
            ? cart.topings.map((toping) => (
                <span className="text-sm">{toping.name}, </span>
              ))
            : ""}
        </h3>
      </div>

      <div className="w-2/12 h-16 flex flex-col justify-between items-end">
        <h3>{priceFormatter(cart.price)}</h3>
        <button
          onClick={() => {
            handleRemove(cart.cartId);
            // console.log("cartId", cart.cartId);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
