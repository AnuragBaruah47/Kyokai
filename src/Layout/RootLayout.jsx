import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const RootLayout = () => {
  return (
    <div
      className=" bg-[#1a1a1a] 
            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]"
    >
      <div className="absolute w-full flex justify-center top-[50px]">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
