import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Toping({ toping, handleToping }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    handleToping(toping);
    setIsChecked(!isChecked);
  };

  return (
    <div
      className="p-2 w-1/4 relative flex flex-col justify-center items-center relative"
      style={{ height: "150px" }}
    >
      <span
        style={{
          borderRadius: "50%",
          backgroundColor: "#1abc9c",
          top: "25px",
          right: "50px",
        }}
        className={`${
          isChecked ? "" : "hidden"
        } w-4 h-4 absolute flex justify-center items-center`}
      >
        {isChecked && (
          <FontAwesomeIcon icon={faCheck} className="w-2 h-2 text-white" />
        )}
        <input
          className="hidden"
          type="checkbox"
          name="toping"
          // onChange={() => handleToping(id)}
          checked={isChecked}
        />
      </span>
      <img
        src={toping.photo}
        alt={toping.title}
        className="object-cover object-center rounded-full"
        style={{
          width: "70px",
          height: "70px",
        }}
        onClick={handleCheck}
      />
      <p
        className="text-base mt-2 fontFamily-avenir text-center"
        style={{
          fontSize: "12px",
        }}
      >
        {toping.name}
      </p>
      {/* <div className="w-12 h-12">
      <img src={photo} alt={title} />
      <h6>{title}</h6>
    </div> */}
    </div>
  );
}

export default Toping;
