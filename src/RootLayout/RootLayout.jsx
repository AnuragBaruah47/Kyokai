import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile";
const RootLayout = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full flex justify-center z-20 fixed top-15">
      <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
