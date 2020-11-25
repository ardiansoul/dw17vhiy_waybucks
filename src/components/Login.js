import React from "react";

function Login() {
  return (
    <div className="w-screen h-screen bg-transparent absolute">
      <div
        className="w-64 bg-white absolute z-50 border-2 rounded-md flex flex-col justify-between p-6"
        style={{
          height: "350px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 className="fontFamily-freight font-bold text-3xl">Login</h1>
        <form className="flex flex-col mt-4">
          <label className="text-base mb-2">Email</label>
          <input
            type="text"
            name="email"
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
          <label className="text-base mb-2">Password</label>
          <input
            type="text"
            name="password"
            className="w-full h-10 border-2 border-base mb-4 p-2 rounded-md"
          />
        </form>
        <button className="w-24 h-8 bg-base border-2 mt-4 border-base rounded-md text-white self-center">
          Login
        </button>
        <span className="text-sm mt-2 self-center">
          Don't have Account ? Click Here
        </span>
      </div>
    </div>
  );
}

export default Login;
