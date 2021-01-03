import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AuthContext";
import { priceFormatter } from "../Utils/priceFormatter";

function ProductItem({ id, photo, name, price }) {
  const history = useHistory();

  return (
    <>
      <div
        className="w-48 flex flex-col rounded-md shadow-2xl my-5 relative"
        onClick={() => {
          history.push(`/products/${id}`);
        }}
      >
        <img
          src={photo}
          alt={name}
          className="w-48 h-64 object-cover object-center rounded-t-md"
        />

        <div className="w-48 h-24 bg-red-200 text-base p-4 flex flex-col justify-between rounded-b-md">
          <h4 className="fontFamily-freight font-bold text-md">{name}</h4>
          <h5 className="fontFamily-avenir text-sm">{priceFormatter(price)}</h5>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
