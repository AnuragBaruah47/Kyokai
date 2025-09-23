import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className="flex justify-center">
      <nav className="h-[60px] flex gap-[160px] items-center rounded-[5px] w-[700px] fixed top-[40px]  z-20 bg-white p-[20px]">
        <div className="flex gap-[20px]">
        <NavLink to="/">
          <button className="flex Home relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
            <IoHomeOutline className="h-[20px] w-[20px]" />
            Home
          </button>
          <div className="relative bottom-[-14px] h-[3px] w-auto"></div>
        </NavLink>
        <NavLink to="/bookmarks">
          <button className="flex relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
            <PiBookmarkSimple className="h-[20px] w-[20px]" />
            Bookmarks
          </button>
          <div className="relative bottom-[-14px] h-[3px] w-auto"></div>
        </NavLink>
        </div>

        <div className="flex gap-[20px]">
        <NavLink to="/recommendation">
          <button className="flex relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
           <FaChartBar className="h-[20px] w-[20px]" />
            Recommendation
          </button>
             <div className="relative bottom-[-14px] h-[3px] w-auto "></div>
        </NavLink>
          <button className="flex relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
           <IoSearch className="h-[20px] w-[20px]" />
            Search
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
