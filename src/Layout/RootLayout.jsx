import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const RootLayout = () => {
  return (
    <div className=" bg-black">
      <div className="absolute w-full flex justify-center top-[50px]">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
