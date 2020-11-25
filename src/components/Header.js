import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import profile from "../assets/images/profile.png";

function Header({ isLogin, showModalLogin, showModalRegister }) {
  return (
    <div
      className={`w-full bg-white h-32 flex justify-between items-center px-10 static`}
    >
      <img src={logo} alt="waybucks" className="w-16" />
      <div className="w-56 flex justify-between items-center">
        {isLogin === false ? (
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
        ) : (
          <>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="ml-10 text-base text-3xl"
            />
            <img
              src={profile}
              alt="user"
              className="w-12 h-12 rounded-full object-cover object-center"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
