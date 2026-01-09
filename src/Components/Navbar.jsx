import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoMdSearch } from "react-icons/io";

const Navbar = () => {
  const elements = [
    { label: "Home", icon: IoHomeOutline, path: "/" },
    { label: "Bookmarks", icon: CiBookmark, path: "/Bookmarks" },
    { label: "Upcoming Anime", icon: SlCalender, path: "/UpcomingAnime" },
    { label: "Search", icon: IoMdSearch },
  ];

  return (
    <nav className="flex justify-center w-full">

   <ul className="flex bg-white border-2 shadow-[8px_8px_0_#000] rounded-md border-black max-w-3xl w-3xl justify-between items-center gap-5">
        {elements.map((e) => {
          return (
            <li
              key={e.icon}
              className="p-3.5 active:scale-90 hover:scale-102 transition-all ease-in-out duration-300"
            >
              <Link
                to={e.path}
                className="text-xl flex font-semibold justify-center items-center gap-2"
              >
                {<e.icon />}
                {e.label}
              </Link>
            </li>
          );
        })}
      </ul>
   
    </nav>
  );
};

export default Navbar;
