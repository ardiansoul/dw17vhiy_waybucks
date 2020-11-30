import { faDoorOpen, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AuthContext";

function Dropdown({ handleDropdown }) {
  const [state, dispatch] = useContext(AppContext);
  const router = useHistory();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    localStorage.clear();
    handleDropdown();
  };

  return (
    <div
      className="bg-white w-48 h-auto absolute flex flex-col justify-center rounded-lg"
      style={{
        boxShadow: "0px 0px 10px #9E9E9E",
        top: "100px",
        right: "20px",
      }}
    >
      <div>
        {state.role === "admin" ? (
          <>
            <button
              className="w-40 h-12 flex items-center m-auto"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                router.push(`/admin/transaction`);
              }}
            >
              <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-base" />
              <h3 className="text-base text-lg font-bold">Transaction</h3>
            </button>
            <button
              className="w-40 h-12 flex items-center m-auto"
              onClick={() => {
                router.push(`/admin/add-product`);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-base" />
              <h3 className="text-base text-lg font-bold">Add Product</h3>
            </button>
            <button
              className="w-40 h-12 flex items-center m-auto"
              onClick={() => {
                router.push(`/admin/add-toping`);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-base" />
              <h3 className="text-base text-lg font-bold">Add Toping</h3>
            </button>
          </>
        ) : (
          <button
            className="w-40 h-12 flex items-center m-auto"
            onClick={() => {
              router.push(`/user/1`);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-base" />
            <h3 className="text-base text-lg font-bold">Profile</h3>
          </button>
        )}
        <span className="w-full border-2 flex border-base"></span>
        <button
          className="w-40 h-12 flex items-center m-auto mt-2"
          onClick={() => {
            handleLogout();
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faDoorOpen} className="mr-2 text-base" />
          <h3 className="text-base text-lg font-bold">Logout</h3>
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
