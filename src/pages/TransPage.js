import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Header from "../components/Header";
import TransactionList from "../components/TransactionList";
import { baseUrl } from "../Utils/API";

function TransPage() {
  const { isLoading, isError, error, data, refetch } = useQuery(
    "TransData",
    () => {
      return Axios.get(`${baseUrl}api/v1/transactions`);
    }
  );

  const [alert, setAlert] = useState("");

  console.log("transaction", data);

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 10000);
  }, [alert]);

  return (
    <div className="w-full relative">
      <Header />
      {alert ? (
        alert === "Cancel" ? (
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
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <div className="w-10/12 m-auto">
          <h1 className="text-base font-bold text-4xl fontFamily-freight">
            Income Transaction
          </h1>
          <TransactionList
            refetch={refetch}
            transactions={data.data.data.transaction}
          />
        </div>
      )}
    </div>
  );
}

export default TransPage;
