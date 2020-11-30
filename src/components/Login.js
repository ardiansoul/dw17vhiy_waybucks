import React, { useContext, useState } from "react";
import { getUser } from "../API/user";
import { AppContext } from "../context/AuthContext";

function Login({ showModalRegister, showModalLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    // role: "admin",
  });
  const [isError, setIsError] = useState("");
  const [state, dispatch] = useContext(AppContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formLogin = getUser.find((user) => user.email === form.email);
    if (formLogin) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      dispatch({
        type: "LOGIN",
        payload: formLogin.role,
      });
      showModalLogin();
    } else {
      setIsError("email or password salah");
    }
  };

  return (
    <div className="w-screen h-screen bg-transparent absolute">
      <div
        className="w-64 bg-white absolute z-50 border-2 rounded-md flex flex-col justify-between p-6"
        style={{
          minHeight: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="fontFamily-freight font-bold text-3xl text-base">
          Login
        </h1>
        {isError && (
          <span className="bg-base w-full h-10 text-white text-center rounded-md leading-10 mt-4">
            {isError}
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
