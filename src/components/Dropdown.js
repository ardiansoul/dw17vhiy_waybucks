import { faDoorOpen, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Dropdown() {
  return (
    <div
      className="bg-white w-48 h-32 border-base border-2 absolute flex flex-col justify-center rounded-lg"
      style={{
        top: "100px",
        right: "20px",
      }}
    >
      <div>
        <button
          className="w-32 flex items-center m-auto"
          onClick={console.log("user")}
        >
          <FontAwesomeIcon icon={faUserAlt} className="mr-2 text-base" />
          <h3 className="text-base text-2xl font-bold">User</h3>
        </button>
        <span className="w-full h-2 border-t-8 border-base"></span>
        <button
          className="w-32  flex items-center m-auto mt-2"
          onClick={console.log("logout")}
        >
          <FontAwesomeIcon icon={faDoorOpen} className="mr-2 text-base" />
          <h3 className="text-base text-2xl font-bold">Logout</h3>
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
