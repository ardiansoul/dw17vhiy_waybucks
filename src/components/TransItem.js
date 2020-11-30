import React from "react";
import OrderItem from "./OrderItem";
import logo from "../assets/images/logo.svg";
import qrcode from "qrcode.react";

function TransItem() {
  const QRCode = qrcode;

  return (
    <div className="w-full flex bg-red-200 p-4 rounded-lg">
      <div className="w-8/12">
        <OrderItem />
        <OrderItem />
      </div>
      <div className="w-4/12 flex flex-col items-center">
        <img src={logo} alt={"logo"} className="w-16" />
        <QRCode value="cobain isinya" renderAs={"svg"} className="w-20 h-20 my-4" />
        <span className="bg-yellow-400 p-2 text-yellow-800 rounded-md">
          Waiting Approve
        </span>
        <h3 className="text-red-800 font-bold text-sm mt-2">Sub Total: 69.000</h3>
      </div>
    </div>
  );
}

export default TransItem;
