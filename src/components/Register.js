import React, { useContext, useState } from "react";
import { AppContext } from "../context/AuthContext";

function Register({ showModalLogin, showModalRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [state, dispatch] = useContext(AppContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("email", form.email);
    localStorage.setItem("password", form.password);
    dispatch({
      type: "LOGIN",
    });
    showModalRegister();
  };

  return (
    <div className="w-screen h-screen bg-transparent absolute">
      <div
        className="w-64 bg-white absolute z-50 border-2 rounded-md flex flex-col justify-between p-6"
        style={{
          height: "500px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="fontFamily-freight font-bold text-3xl text-base">
          Register
        </h1>
        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <label className="text-base mb-2">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            onChange={handleChange}
            value={form.fullName}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <button
            className="w-24 h-8 bg-base border-2 mt-4 border-base rounded-md text-white self-center"
            type="submit"
          >
            Login
          </button>
        </form>
        <span className="text-sm mt-2 self-center">
          Already have an account ? Click{" "}
          <button onClick={showModalLogin}>Here</button>
        </span>
      </div>
    </div>
  );
}

export default Register;
