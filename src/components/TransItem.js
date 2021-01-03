import React from "react";
import OrderItem from "./OrderItem";
import logo from "../assets/images/logo.svg";
import qrcode from "qrcode.react";
import { priceFormatter } from "../Utils/priceFormatter";
import { useMutation } from "react-query";
import Axios from "axios";
import { baseUrl } from "../Utils/API";

function TransItem({ transaction, refetch }) {
  const [mutate] = useMutation(({ id, status }) => {
    return Axios({
      method: "put",
      url: `${baseUrl}api/v1/transaction/${id}`,
      data: { status: status },
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  const handleButton = async (status, id) => {
    try {
      let data = { id, status };
      await mutate(data, {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (data) => {
          refetch();
        },
      });
    } catch (err) {
      console.log(id);
    }
  };

  const QRCode = qrcode;

  return (
    <div className="w-full flex bg-red-200 p-4 rounded-lg mb-6">
      <div className="w-8/12">
        {transaction.products?.map((product) => (
          <OrderItem product={product} />
        ))}
      </div>
      <div className="w-4/12 flex flex-col items-center">
        <img src={logo} alt={"logo"} className="w-16" />
        <QRCode
          value="cobain isinya"
          renderAs={"svg"}
          className="w-20 h-20 my-4"
        />
        <span
          className={` ${
            transaction.status === "Success"
              ? "bg-green-600"
              : transaction.status === "Cancel"
              ? "bg-red-600"
              : transaction.status === "On The Way"
              ? "bg-blue-600"
              : "bg-yellow-600"
          } p-2 text-white rounded-md w-32 text-center`}
        >
          {transaction.status}
        </span>
        <h3 className="text-red-800 font-bold text-sm mt-2">{`Sub Total: ${priceFormatter(
          transaction.income
        )}`}</h3>
        {transaction.status === "On The Way" ? (
          <button
            className="w-32 bg-green-600 text-white h-8 rounded-md m-2"
            onClick={() => {
              handleButton("Success", transaction.id);
            }}
          >
            Received
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default TransItem;
