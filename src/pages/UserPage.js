import React from "react";
import Header from "../components/Header";
import profile from "../assets/images/profile.png";
import TransItem from "../components/TransItem";

function UserPage() {
  return (
    <div className="w-full relative">
      <Header />
      <div className="w-10/12 h-screen flex m-auto">
        <div className="w-6/12">
          <h1 className="text-base font-bold text-2xl mb-6">My Profile</h1>
          <div className="flex">
            <img
              src={profile}
              alt={`user`}
              className="h-64 object-cover object-center"
            />
            <div className=" ml-4">
              <h3 className="text-red-800 font-bold">Full Name</h3>
              <h3>Egi Ganteng</h3>
              <h3 className="text-red-800 font-bold mt-10">Email</h3>
              <h3>egiganteng@gmail.com</h3>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <h1 className="text-red-800 font-bold text-2xl mb-6">My Transaction</h1>
          <TransItem />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
