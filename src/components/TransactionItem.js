import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { priceFormatter } from "../Utils/priceFormatter";

function TransactionItem({ index, transaction, handleButton }) {
  return (
    <tr className="h-12 text-center">
      <td className="w-10">{index + 1}</td>
      <td>{transaction.name}</td>
      <td>{transaction.address}</td>
      <td>{transaction.posCode}</td>
      <td className="text-blue-600">{priceFormatter(transaction.income)}</td>
      <td
        className={`${
          transaction.status === "Success"
            ? "text-green-600"
            : transaction.status === "Cancel"
            ? "text-red-600"
            : transaction.status === "On The Way"
            ? "text-blue-600"
            : "text-yellow-800"
        } text-sm font-bold w-48`}
      >
        {transaction.status}
      </td>
      <td className="w-32">
        {transaction.status === "On The Way" ||
        transaction.status === "Success" ? (
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
        ) : transaction.status === "Cancel" ? (
          <FontAwesomeIcon icon={faTimesCircle} className="text-red-600" />
        ) : (
          <div className="w-48">
            <button
              className="w-20 h-8 bg-red-600 text-white mr-4 rounded-md"
              name="cancel"
              onClick={() => {
                handleButton("Cancel", transaction.id);
              }}
            >
              cancel
            </button>
            <button
              className="w-20 h-8 bg-green-600 text-white rounded-md"
              name="approve"
              onClick={() => {
                handleButton("On The Way", transaction.id);
              }}
            >
              approve
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default TransactionItem;
