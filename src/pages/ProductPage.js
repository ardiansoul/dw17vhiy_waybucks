import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../API/product";
import { getToppings } from "../API/topping";
import Header from "../components/Header";
import Toping from "../components/Toping";
import { AppContext } from "../context/AuthContext";

function ProductPage({ isLogin, showModalLogin, showModalRegister }) {
  const [product, setProduct] = useState(null);
  const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  const { id } = useParams();
  const [carts, setCarts] = useState([]);
  const [topingPrice, setTopingPrice] = useState(0);

  useEffect(() => {
    try {
      setIsLoading(true);
      const product = getProducts.find((product) => product.id == id);
      setProduct(product);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let totalToping = 0;
    carts.map((cart) => {
      if (isNaN(totalToping)) {
        totalToping = 0;
      }
      return (totalToping += cart.price);
    });
    setTopingPrice(totalToping);
    // console.log("totaltoping", totalToping);
    // console.log("total", total);
  }, [carts]);

  const handleToping = (toping) => {
    // const topingFind = carts.filter((cart) => cart !== id);
    const topingFind = carts.find((cart) => cart.id === toping.id);
    // console.log("toping", topingFind);
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
      console.log("anda belum login");
    }
  };
  console.log("carts", { ...product, carts });
  return (
    <div className="w-full relative">
      <Header
        isLogin={isLogin}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      {!product ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        </div>
      ) : (
        <div className="w-10/12 h-screen m-auto flex my-10">
          <div className="w-5/12 h-full">
            <img
              src={product.photo}
              alt={product.title}
              className="w-full object-cover object-center rounded-lg"
              style={{
                height: "600px",
              }}
            />
          </div>
          <div className="w-7/12 h-full p-10 flex flex-col">
            <div className="w-full mb-10">
              <h1 className="text-base font-bold fontFamily-freight text-4xl">
                {product.title}
              </h1>
              <h3 className="text-base fontFamily-avenir text-xl">
                {product.price.toLocaleString("id", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h3>
            </div>
            <h1 className="text-xl text-base fontFamily-freight font-bold">
              Toping
            </h1>
            <div className="w-full flex flex-wrap">
              {getToppings.map((toping, index) => {
                return (
                  <Toping
                    key={index}
                    toping={toping}
                    handleToping={handleToping}
                  />
                );
              })}
            </div>
            <div className="w-full flex justify-between text-base mt-10">
              <h6>Total</h6>
              <h6>
                {(product.price + topingPrice).toLocaleString("id", {
                  style: "currency",
                  currency: "IDR",
                })}
              </h6>
            </div>
            <button
              className="w-full h-10 bg-base text-white mt-10 rounded-md"
              onClick={() => {
                handleAddCart({
                  ...product,
                  price: product.price + topingPrice,
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
