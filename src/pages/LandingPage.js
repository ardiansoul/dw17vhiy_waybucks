import React from "react";
import Header from "../components/Header";
import jumbotron from "../assets/images/jumbotron.jpg";
import ProductItem from "../components/ProductItem";
import Login from "../components/Login";
import { getProducts } from "../API/product";

function LandingPage({ isLogin, showModalLogin, showModalRegister }) {
  return (
    <>
      <div className="w-full relative">
        <Header
          isLogin={isLogin}
          showModalLogin={showModalLogin}
          showModalRegister={showModalRegister}
        />
        <div className="h-screen w-8/12 relative">
          <div
            className="w-full mt-12 ml-32 bg-base rounded-md relative flex p-16"
            style={{
              height: "400px",
            }}
          >
            <div className="w-8/12 h-full text-white">
              <h1
                className="text-6xl -my-10 font-bold fontFamily-freight"
                // style={{
                //   fontFamily: "`Freight Sans`, sans",
                // }}
              >
                WAYDUCKS
              </h1>
              <p className="my-10 text-2xl  fontFamily-avenir">
                Things are changing, but we’re still here for you
              </p>
              <div className="my-10 text-xl  fontFamily-avenir">
                <p>
                  We have temporarily closed our in-store cafes, but select
                  grocery and drive-thru locations remaining open.{" "}
                  <span className="font-bold">Waysbucks</span> Drivers is also
                  available
                </p>
                <p className="my-6  fontFamily-avenir">Let’s Order...</p>
              </div>
            </div>
            <img
              src={jumbotron}
              alt="waybucks"
              className="h-64 absolute rounded-md"
              style={{
                top: "50px",
                right: "-150px",
              }}
            />
          </div>
        </div>
        <div className="h-screen w-8/12 relative m-auto">
          <h1 className="fontFamily-freight text-4xl text-base font-bold">
            Let's Order
          </h1>
          <div className="w-12/12 h-auto flex flex-wrap mt-4 justify-between">
            {getProducts.map((product) => {
              return (
                <ProductItem
                  photo={product.photo}
                  title={product.title}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
