import Axios from "axios";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { AppContext } from "../context/AuthContext";
import { baseUrl } from "../Utils/API";

function Login({ showModalRegister, showModalLogin }) {
  const [mutate, { error, data }] = useMutation(
    (form) => Axios.post(`${baseUrl}auth/login`, form)
    // {
    //   onSuccess: (data) => {
    //     return data;
    //   },
    //   onError: (error) => {
    //     return error;
    //   },
    // }
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [state, dispatch] = useContext(AppContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutate(form, {
        onSuccess: (data) => {
          dispatch({
            type: "LOGIN",
            payload: data.data,
          });
          showModalLogin();
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-transparent absolute">
      <div
        className="w-64 bg-white absolute z-50 border-2 rounded-md flex flex-col justify-between p-6"
        style={{
          width: "300px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="fontFamily-freight font-bold text-3xl text-base">
          Login
        </h1>
        {error && (
          <span className="w-full h-10 text-xs text-center mb-2 leading-10 text-white bg-base rounded-md">
            {error.response.data.message}
          </span>
        )}
        <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
          <label className="text-base mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <button className="w-24 h-8 bg-base border-2 mt-4 border-base rounded-md text-white self-center">
            Login
          </button>
        </form>
        <span className="text-sm mt-2 self-center">
          Don't have Account ? Click{" "}
          <button onClick={showModalRegister}>Here</button>
        </span>
      </div>
    </div>
  );
}

export default Login;
