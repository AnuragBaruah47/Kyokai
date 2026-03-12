import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile";
import { useUserStore } from "../Store/UserStore";
const RootLayout = () => {
    const user = useUserStore((state) => state.user);
  return (
    <div className="h-screen w-screen">
      <div className="w-full flex justify-center z-20 fixed top-15">
      <Navbar />
      </div>
      {user?  <div className="absolute right-60 top-18 z-200">
       <Profile/>
      </div> :  <div className="absolute right-90 top-18 z-200">
       <Profile/>
      </div>}
     

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
