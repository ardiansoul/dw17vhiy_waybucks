import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getTransaction } from "../API/transaction";
import Header from "../components/Header";

function TransPage() {
  const [alert, setAlert] = useState("");
  const handleButton = (e, transaction) => {
    e.preventDefault();
    console.log(transaction);
    // console.log(e.target.name);
    setAlert(e.target.name);
  };

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 10000);
  }, [alert]);

  return (
    <div className="w-full relative">
      <Header />
      {alert ? (
        alert === "cancel" ? (
          <div
            className="w-48 h-10 absolute bg-red-200 text-red-800 text-center leading-10 rounded-md"
            style={{
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            Transaction is Cancelled
          </div>
        ) : (
          <div
            className="w-48 h-10 absolute bg-green-200 text-green-800 text-center leading-10 rounded-md"
            style={{
              left: "50%",
              transform: "translate(-50%, 0)",
            }}
          >
            Transaction is Approved
          </div>
        )
      ) : (
        ""
      )}
      <div className="w-10/12 m-auto">
        <h1 className="text-base font-bold text-4xl fontFamily-freight">
          Income Transaction
        </h1>
        <table className="w-full mt-6">
          <tr className="bg-red-800 h-10 text-white">
            <th>No</th>
            <th>Name</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Income</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {getTransaction.map((transaction) => (
            <tr className="h-12 text-center">
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.address}</td>
              <td>{transaction.postCode}</td>
              <td className="text-blue-600">{transaction.income}</td>
              <td
                className={`${
                  transaction.status === "Success"
                    ? "text-green-600"
                    : transaction.status === "Cancel"
                    ? "text-red-600"
                    : "text-yellow-600"
                } text-sm font-bold`}
              >
                {transaction.status}
              </td>
              <td>
                {transaction.status === "Success" ? (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-600"
                  />
                ) : transaction.status === "Cancel" ? (
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="text-red-600"
                  />
                ) : (
                  <>
                    <button
                      className="w-20 h-8 bg-red-600 text-white mr-4 rounded-md"
                      name="cancel"
                      onClick={(e, transaction) => {
                        handleButton(e, transaction);
                      }}
                    >
                      cancel
                    </button>
                    <button
                      className="w-20 h-8 bg-green-600 text-white rounded-md"
                      name="approve"
                      onClick={(e, transaction) => {
                        handleButton(e, transaction);
                      }}
                    >
                      approve
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default TransPage;
