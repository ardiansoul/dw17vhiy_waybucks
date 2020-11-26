import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../API/product";
import { getToppings } from "../API/topping";
import Header from "../components/Header";
import Toping from "../components/Toping";

function ProductPage({ isLogin, showModalLogin, showModalRegister }) {
  const [product, setProduct] = useState({
    title: getProducts[2].title,
    photo: getProducts[2].photo,
    price: getProducts[2].price,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   try {
  //     setIsLoading(true);
  //     const { id } = useParams;
  //     const getProduct = async () => {
  //       console.log(getProducts);
  //       const product = await getProducts.filter(
  //         (product) => product.id === id
  //       );
  //       setProduct(product);
  //       console.log(product);
  //     };
  //     getProduct();
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return (
    <div className="w-full relative">
      <Header
        isLogin={isLogin}
        showModalLogin={showModalLogin}
        showModalRegister={showModalRegister}
      />
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
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
                {
                  product.price
                  // .toLocaleString("id", {
                  //   style: "currency",
                  //   currency: "IDR",
                }
              </h3>
            </div>
            <h1 className="text-xl text-base fontFamily-freight font-bold">
              Toping
            </h1>
            <div className="w-full flex flex-wrap">
              {getToppings.map((toping) => {
                return (
                  <Toping
                    key={toping.id}
                    photo={toping.photo}
                    title={toping.title}
                  />
                );
              })}
            </div>
            <div className="w-full flex justify-between text-base mt-10">
              <h6>Total</h6>
              <h6>{product.price}</h6>
            </div>
            <button className="w-full h-10 bg-base text-white mt-10">
              Add Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
