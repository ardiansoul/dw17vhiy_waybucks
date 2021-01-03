function Alert({ message, status }) {
  return (
    <div
      className={`${
        status === 201 ? "bg-green-600" : status === 400 ? "bg-red-600" : ""
      } w-64 p-2 absolute rounded-md flex justify-center items-center border-2`}
      style={{
        minHeight: "20px",
        top: "50px",
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <h1 className="text-sm text-white">{message}</h1>
    </div>
  );
}

export default Alert;
