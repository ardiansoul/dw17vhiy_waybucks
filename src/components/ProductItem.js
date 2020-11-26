import React from "react";
import { Link } from "react-router-dom";

function ProductItem({ id, photo, title, price }) {
  const newPrice = price.toLocaleString("id", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Link to={`/products/${id}`}>
      <div className="w-48 flex flex-col rounded-md shadow-2xl">
        <img
          src={photo}
          alt={title}
          className="w-48 h-64 object-cover object-center rounded-t-md"
        />
        <div className="w-48 h-24 bg-red-200 text-base p-4 flex flex-col justify-between rounded-b-md">
          <h4 className="fontFamily-freight font-bold text-md">{title}</h4>
          <h5 className="fontFamily-avenir text-sm">{newPrice}</h5>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
