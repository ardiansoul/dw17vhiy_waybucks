import React, { useState } from "react";

function Toping({ toping, handleToping }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    handleToping(toping);
    setIsChecked(!isChecked);
  };

  return (
    <div className="w-24 h-24 m-5 relative flex flex-col items-center">
      <img
        src={toping.photo}
        alt={toping.title}
        className="w-12 h-12 object-cover object-center rounded-full"
        onClick={handleCheck}
      />
      <input
        type="checkbox"
        name="toping"
        // onChange={() => handleToping(id)}
        checked={isChecked}
        className="absolute"
        style={{
          top: "5px",
          right: "20px",
        }}
      />
      <p
        className="text-base fontFamily-avenir text-center"
        style={{
          fontSize: "12px",
        }}
      >
        {toping.title}
      </p>
      {/* <div className="w-12 h-12">
      <img src={photo} alt={title} />
      <h6>{title}</h6>
    </div> */}
    </div>
  );
}

export default Toping;
