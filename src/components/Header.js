import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/images/logo.svg";
import profile from "../assets/images/profile.png";
import { AppContext } from "../context/AuthContext";
import Dropdown from "./Dropdown";

function Header({ showModalLogin, showModalRegister }) {
  const [state] = useContext(AppContext);
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div
        className={`w-full bg-white h-32 flex justify-between items-center px-10 static`}
      >
        <img
          src={logo}
          alt="waybucks"
          className="w-16"
          onClick={() => {
            history.push("/");
          }}
          style={{
            cursor: "pointer",
          }}
        />
        <div className="w-56 flex justify-between items-center">
          {state.isLogin === false ? (
            <>
              <button
                className="w-24 h-8 bg-white border-2 border-base rounded-md text-base"
                onClick={showModalLogin}
              >
                Login
              </button>
              <button
                className="w-24 h-8 bg-base border-2 border-base rounded-md text-white"
                onClick={showModalRegister}
              >
                Register
              </button>
            </>
          ) : state.role === "admin" ? (
            <>
              <span></span>
              <img
                src={profile}
                alt="user"
                className="w-12 h-12 rounded-full object-cover object-center"
                onClick={handleDropdown}
                style={{
                  cursor: "pointer",
                }}
              />
            </>
          ) : (
            <>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="ml-10 text-base text-3xl"
                  onClick={() => history.push("/cart")}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <span className="w-4 h-4 absolute rounded-full bg-base text-xs text-center leading-4 text-white">
                  {state.carts.length}
                </span>
              </div>
              <img
                src={profile}
                alt="user"
                className="w-12 h-12 rounded-full object-cover object-center"
                onClick={handleDropdown}
                style={{
                  cursor: "pointer",
                }}
              />
            </>
          )}
        </div>
      </div>
      {showDropdown && <Dropdown handleDropdown={handleDropdown} />}
    </>
  );
}

export default Header;
