import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import { AppContext } from "../context/AuthContext";

function CartPage() {
  const [form, setForm] = useState({});
  const [state] = useContext(AppContext);
  const [totalPay, setTotalPay] = useState(0);
  const [alert, setAlert] = useState(false);
  const router = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    // router.push("/user/1");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let total = totalPay;
    state.carts.map((cart) => {
      return (total += cart.price);
    });
    setTotalPay(total);
  }, []);

  const handleRemove = (id) => {
    const removeById = state.carts.filter((cart) => cart.id === id);
    console.log(removeById);
  };

  return (
    <div className="w-full relative">
      <Header />
      <div className="w-10/12 h-screen flex m-auto">
        <div className="w-7/12 h-full flex flex-col p-5">
          <h1 className="font-bold text-2xl text-base mb-4">My Cart</h1>
          <h4 className="font-bold text-lg text-base mb-2">
            Review Your Order
          </h4>
          <span className="w-full border-base border-2 rounded-md"></span>
          <div
            className="overflow-auto"
            style={{
              maxHeight: "350px",
            }}
          >
            {/* <CartItem />
          <CartItem /> */}
            {state.carts.map((cart, index) => (
              <CartItem key={index} cart={cart} handleRemove={handleRemove} />
            ))}
          </div>

          <span className="w-full border-base border-2 rounded-md"></span>

          {/* {CartItems.map(() => {
            <CartItem />
          })} */}
          <div className="w-full flex mt-12">
            <div className="w-6/12 flex flex-col h-32 justify-center">
              <span className="w-full border-red-400 border-2 rounded-md"></span>
              <div className="flex justify-between mt-4">
                <h4>SubTotal: </h4>
                <h4>{totalPay}</h4>
              </div>
              <div className="flex justify-between mb-4">
                <h4>Qty: </h4>
                <h4>{state.carts.length}</h4>
              </div>
              <span className="w-full border-red-400 border-2 rounded-md"></span>
            </div>
            {/* <div className=""> */}
            <label className="w-6/12 border-2 border-base text-base h-32 ml-6 rounded-lg flex justify-center items-center flex-col">
              <FontAwesomeIcon icon={faFileInvoice} className="text-6xl" />
              <h3>Add Your Attachment</h3>
              <input type="file" className="hidden" />
            </label>
            {/* </div> */}
          </div>
        </div>
        <div className="w-5/12 h-full mt-32">
          <form
            className="h-full flex flex-col items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
              name="posCode"
              placeholder="Pos Code"
              value={form.posCode}
              onChange={handleChange}
            />
            <textarea
              className="w-10/12 h-64 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            ></textarea>
            <button
              className="w-10/12 h-12 bg-base text-white text-center leading-12 mt-10 rounded-md"
              type="submit"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
      {alert && (
        <div
          className="h-20 absolute border-2 bg-white rounded-md flex items-center justify-center"
          style={{
            width: "500px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={() => {
            router.push("/user/1");
          }}
        >
          <h3 className="text-green-600 font-bold">
            Thank you for ordering in us, please wait for verify your order{" "}
          </h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
