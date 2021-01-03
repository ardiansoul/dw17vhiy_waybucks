import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import CartList from "../components/CartList";
import Header from "../components/Header";
import { AppContext } from "../context/AuthContext";
import { baseUrl } from "../Utils/API";
import { priceFormatter } from "../Utils/priceFormatter";

function CartPage() {
  const [state, dispatch] = useContext(AppContext);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [alert, setAlert] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (state.carts.length > 0) {
      let total = state.carts
        .map((cart) => {
          return cart.price;
        })
        .reduce((a, b) => a + b);
      let products = state.carts.map((cart) => {
        return {
          productId: cart.productId,
          amount: 1,
          price: cart.price,
          topings: cart.topings.map((toping) => {
            return { id: toping.id };
          }),
        };
      });
      setForm({
        ...form,
        products: products,
        income: total,
      });
    }
  }, [state.carts]);

  const handleImage = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
    reader.onloadend = (e) => {
      setPreview([reader.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [mutate] = useMutation((form) =>
    Axios({
      method: "POST",
      url: `${baseUrl}api/v1/transactions`,
      data: form,
      headers: {
        Authorization: localStorage.token,
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("posCode", form.posCode);
      data.append("address", form.address);
      data.append("status", "Waiting Approve");
      data.append("income", form.income);
      for (let i = 0; i < form.products.length; i++) {
        data.append(`products[${i}][productId]`, form.products[i].productId);
        data.append(`products[${i}][amount]`, form.products[i].amount);
        for (let j = 0; j < form.products[i].topings.length; j++) {
          data.append(
            `products[${i}][topings][${j}]`,
            form.products[i].topings[j].id
          );
        }
      }
      data.append("attachment", attachment);

      await mutate(data, {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (data) => {
          dispatch({
            type: "RESET_CART",
          });
          setAlert(true);
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {alert && (
        <div
          className="h-full z-50 w-screen overflow-visible fixed flex justify-center items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <div
            className="h-20 border-2 bg-white rounded-md flex jistify-center items-center p-10"
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              history.push("/user");
            }}
          >
            <h3 className="text-green-600 font-bold">
              Thank you for ordering in us, please wait for verify your order{" "}
            </h3>
          </div>
        </div>
      )}
      <div className="w-full h-screen relative">
        <Header />

        <div className="w-10/12  mb-20 flex flex-col m-auto justify-between">
          <h1 className="font-bold text-2xl text-base mb-4">My Cart</h1>
          <h4 className="font-bold text-lg text-base mb-2">
            Review Your Order
          </h4>
          <div className="flex justify-center">
            <div className="w-6/12 h-full flex flex-col">
              <span className="w-full border-base border-2 rounded-md"></span>
              <CartList />
              <span className="w-full border-base border-2 rounded-md"></span>
              <div className="w-full flex mt-12">
                <div className="w-6/12 flex flex-col h-32 justify-center">
                  <span className="w-full border-base border-2 rounded-md"></span>
                  <div className="flex justify-between mt-4">
                    <h4>SubTotal: </h4>
                    <h4>{priceFormatter(form.income)}</h4>
                  </div>
                  <div className="flex justify-between mb-4">
                    <h4>Qty: </h4>
                    <h4>{state.carts.length}</h4>
                  </div>
                  <span className="w-full border-base border-2 rounded-md"></span>
                  <div className="flex justify-between mt-4">
                    <h4>Total: </h4>
                    <h4>{priceFormatter(form.income)}</h4>
                  </div>
                </div>
                <label className="w-6/12 border-2 border-base text-base h-32 ml-6 rounded-lg flex justify-center items-center flex-col">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-center object-cover"
                    />
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className="text-6xl"
                      />
                      <h3>Add Your Attachment</h3>
                    </>
                  )}
                  <input
                    type="file"
                    name="attachment"
                    className="hidden"
                    onChange={(e) => handleImage(e)}
                  />
                </label>
              </div>
            </div>
            <div className="w-6/12 h-full flex">
              <form
                className="h-full w-full flex flex-col items-center"
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <input
                  type="text"
                  className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  className="w-10/12 h-12 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
                  name="posCode"
                  placeholder="Pos Code"
                  value={form.posCode}
                  onChange={(e) => handleChange(e)}
                />
                <textarea
                  className="w-10/12 h-64 bg-red-200 border-2 border-base rounded-md mt-6 p-2"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => handleChange(e)}
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
        </div>
      </div>
    </>
  );
}

export default CartPage;
