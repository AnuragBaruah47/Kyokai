import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
const RootLayout = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full z-20 fixed top-15">
      <Navbar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
