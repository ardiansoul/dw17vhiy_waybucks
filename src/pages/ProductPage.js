import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Toping from "../components/Toping";
import { AppContext } from "../context/AuthContext";
import { useQuery } from "react-query";
import Axios from "axios";
import { priceFormatter } from "../Utils/priceFormatter";
import { baseUrl } from "../Utils/API";

function ProductPage({ showModalLogin, showModalRegister }) {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery("product", () => {
    return Axios.get(`${baseUrl}api/v1/product/${id}`);
  });

  const { isLoading: isLoadingToping, data: dataToping } = useQuery(
    "toping",
    () => {
      return Axios.get(`${baseUrl}api/v1/topings`);
    }
  );

  const [state, dispatch] = useContext(AppContext);
  const [carts, setCarts] = useState([]);
  const [topingPrice, setTopingPrice] = useState(0);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    let totalToping = 0;
    totalToping = carts
      .map((cart) => {
        if (isNaN(totalToping)) {
          totalToping = 0;
        }
        return cart.price;
      })
      .reduce((a, b) => a + b, 0);
    setTopingPrice(totalToping);
  }, [carts]);

  const handleToping = (toping) => {
    const topingFind = carts.find((cart) => cart.id === toping.id);
    if (!topingFind) {
      setCarts([...carts, toping]);
    } else {
      const newCarts = carts.filter((cart) => cart.id !== toping.id);
      setCarts(newCarts);
    }
  };

  const handleAddCart = (cart) => {
    if (state.isLogin === true) {
      dispatch({
        type: "ADD_CART",
        payload: cart,
      });
    } else {
      showModalLogin();
    }
  };

  return (
    <div className="w-full relative">
      <Header
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
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
              setAlert(false);
            }}
          >
            <h3 className="text-green-600 font-bold">Admin Cannot add Cart</h3>
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : isError ? (
        <div>{error}</div>
      ) : (
        <div className="w-10/12 h-screen m-auto flex my-10">
          <div
            className="w-5/12"
            style={{
              height: "500px",
            }}
          >
            <img
              src={data.data.data.product.photo}
              alt={data.data.data.product.name}
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          <div
            className="w-7/12 pl-10 flex flex-col"
            style={{
              height: "500px",
            }}
          >
            <div className="w-full mb-10">
              <h1 className="text-base font-bold fontFamily-freight text-4xl">
                {data.data.data.product.name}
              </h1>
              <h3 className="text-base fontFamily-avenir text-xl">
                {priceFormatter(data.data.data.product.price)}
              </h3>
            </div>
            <h1 className="text-xl text-base fontFamily-freight font-bold">
              Toping
            </h1>
            <div
              className="flex flex-wrap overflow-auto"
              style={{
                width: "600px",
                height: "250px",
              }}
            >
              {isLoadingToping ? (
                <FontAwesomeIcon icon={faSpinner} spin size="6x" />
              ) : (
                dataToping.data.data.topings.map((toping, index) => {
                  return (
                    <Toping
                      key={index}
                      toping={toping}
                      handleToping={handleToping}
                    />
                  );
                })
              )}
            </div>
            <div className="w-full flex justify-between text-base mt-10">
              <h6>Total</h6>
              <h6>
                {priceFormatter(data.data.data.product.price + topingPrice)}
              </h6>
            </div>
            <button
              className="w-full h-10 bg-base text-white mt-4 rounded-md"
              onClick={() => {
                state.role === "admin"
                  ? setAlert(true)
                  : handleAddCart({
                      productId: data.data.data.product.id,
                      name: data.data.data.product.name,
                      photo: data.data.data.product.photo,
                      price: data.data.data.product.price + topingPrice,
                      topings: carts,
                    });
              }}
            >
              Add Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
