import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Header from "../components/Header";

function AddTopingPage() {
  const [file, setFile] = useState({});
  const [preview, setpreview] = useState(null);

  const handleImage = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log(file);
    }
    reader.onloadend = (e) => {
      setpreview([reader.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full relative">
      <Header />
      <div className="w-10/12 flex m-auto justify-between">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold fontFamily-freight text-base">
            Toping
          </h1>
          <form className="flex flex-col mt-10">
            <input
              type="text"
              placeholder="Toping Name"
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6"
            />
            <label className="w-full h-10 bg-red-200 border-2 border-base p-2 rounded-md mt-6 flex justify-between">
              <h3 className="text-gray-600">Toping Photo</h3>
              <input
                placeholder="Product Photo"
                className="hidden"
                type="file"
                onChange={(e) => {
                  handleImage(e);
                }}
              />
              <FontAwesomeIcon icon={faPaperclip} className="text-base" />
            </label>
            <button className="w-10/12 h-10 bg-base text-white mt-6 rounded-md self-center">
              Add Toping
            </button>
          </form>
        </div>
        <div
          className="w-4/12 border-2 border-base rounded-md"
          style={{
            height: "500px",
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt={"input"}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <h3>Preview Image in Here</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTopingPage;
