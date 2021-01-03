import { priceFormatter } from "../Utils/priceFormatter";
import moment from "moment";
import { useEffect, useState } from "react";

function OrderItem({ product }) {
  const [total, setTotal] = useState(0);
  console.log(product);
  // useEffect(() => {
  //   if (product.topings) {
  //     let total = product.topings
  //       .map((toping) => {
  //         return toping.price;
  //       })
  //       .reduce((a, b) => a + b);
  //     setTotal(total);
  //   }
  // }, []);

  return (
    <div className="w-full h-32 flex items-center">
      <img
        src={product.product.photo}
        alt={"orderitem"}
        className="w-24 h-24"
      />
      <div className="ml-4 text-base">
        <h3 className="font-bold">{product.product.name}</h3>
        <h5 className="text-sm">
          <span className=" font-bold text-sm">
            {moment(product.createdAt).format("dddd")}
            {", "}
          </span>
          {/* {product.createdAt} */}
          {moment(product.createdAt).format("DD MMMM YYYY")}
        </h5>
        <h3 className="text-sm mt-2">
          <span className="font-bold text-red-800">Toping : </span>

          {product.topings.map((toping) => {
            return `${toping.name},`;
          })}
        </h3>
        <h5 className="text-sm text-red-800">{`Price : ${priceFormatter(
          product.product.price + total
        )}`}</h5>
      </div>
    </div>
  );
}

export default OrderItem;
