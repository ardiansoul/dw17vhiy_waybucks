import React, { useEffect } from "react";
import Header from "../components/Header";
import profile from "../assets/images/profile.png";
import TransItem from "../components/TransItem";
import { useQuery } from "react-query";
import Axios from "axios";
import { baseUrl } from "../Utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function UserPage() {
  const { isLoading, isError, error, data } = useQuery("User", () => {
    return Axios({
      method: "GET",
      url: `${baseUrl}api/v1/user`,
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  const {
    isLoading: transactionLoading,
    data: TransactionData,
    refetch,
  } = useQuery("Transaction", () => {
    return Axios({
      method: "GET",
      url: `${baseUrl}api/v1/user/transaction`,
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    });
  });

  return (
    <div className="w-full relative">
      <Header />
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : (
        <div className="w-10/12 h-screen flex m-auto">
          <div className="w-6/12">
            <h1 className="text-base font-bold text-2xl mb-6">My Profile</h1>
            <div className="flex">
              <img
                src={profile}
                alt={`user`}
                className="h-64 object-cover object-center"
              />
              <div className=" ml-4">
                <h3 className="text-red-800 font-bold">Full Name</h3>
                <h3 className="text-lg font-bold">
                  {data.data.data.users.fullName}
                </h3>
                <h3 className="text-red-800 font-bold mt-10">Email</h3>
                <h3 className="text-lg font-bold">
                  {data.data.data.users.email}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-6/12">
            <h1 className="text-red-800 font-bold text-2xl mb-6">
              My Transaction
            </h1>
            {transactionLoading ? (
              <div className="w-full h-screen flex justify-center items-center">
                <FontAwesomeIcon icon={faSpinner} spin size="6x" />
              </div>
            ) : !TransactionData.data.data.transaction ? (
              <div className="w-full flex justify-center items-center">
                <h1 className="text-lg font-bold">no transaction history</h1>
              </div>
            ) : (
              TransactionData.data.data.transaction.map((transaction) => (
                <TransItem transaction={transaction} refetch={refetch} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
