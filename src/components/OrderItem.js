import React from "react";
import product from "../assets/images/product1.jpeg";

function OrderItem() {
  return (
    <div className="w-full h-32 flex items-center">
      <img src={product} alt={"orderitem"} className="w-24 h-24" />
      <div className="ml-4 text-base">
        <h3 className="font-bold">
          {"Ice Coffe Palm Sugar"}
        </h3>
        <h5 className="text-sm">
          <span className=" font-bold text-sm">Saturday , </span>
          {"5 march 2020"}
        </h5>
        <h3 className="text-sm mt-2">
          <span className="font-bold text-red-800">Toping : </span>
          {"Bill Berry Boba, Manggo"}
        </h3>
        <h5 className="text-sm text-red-800">Price : 36000</h5>
      </div>
    </div>
  );
}

export default OrderItem;
