import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { PiBookmarkSimple } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaChartBar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Loader from "../Components/Loader";
import { GoSearch } from "react-icons/go";
import SearchComponent from "./SearchComponent";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoad, setSearchLoad] = useState(false);
  const setSearchValue = () => {
    if (search === false) {
      setSearch(true);
      setSearchLoad(false)
    } else if (search === true) {
      setSearch(false);
    }
  };

  if(response){
    console.log(response);
  }

  const setValueOfInput = (e) => {
    setValue(e.target.value);
  };

  const fetchData = async () => {
    try {
      if (value) {
        setLoading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${value}`
        );
        setResponse(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSearchLoad(true);
    }
  };

  if (response) {
    console.log(response);
  }

  return (
    <div className="flex justify-center">
      {search === false ? (
        <nav className="border-[2px] border-black h-[60px] flex gap-[160px] items-center rounded-[5px] w-[700px] z-20 bg-white p-[20px]">
          <div className="flex gap-[20px]">
            <NavLink to="/">
              <button className="flex  hover:text-red-400 Home relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
                <IoHomeOutline className="h-[20px] w-[20px]" />
                Home
              </button>
              <div className="relative bottom-[-14px] h-[3px] w-auto"></div>
            </NavLink>
            <NavLink to="/bookmarks">
              <button className="flex  hover:text-red-400 relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
                <PiBookmarkSimple className="h-[20px] w-[20px]" />
                Bookmarks
              </button>
              <div className="relative bottom-[-14px] h-[3px] w-auto"></div>
            </NavLink>
          </div>

          <div className="flex h-auto gap-[20px] w-auto">
            <NavLink to="/recommendation">
              <button className="flex hover:text-red-400 relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700] gap-[5px]">
                <FaChartBar className="h-[20px] w-[20px]" />
                Recommendation
              </button>
              <div className="relative bottom-[-14px] h-[3px] w-auto "></div>
            </NavLink>

            <button
              onClick={setSearchValue}
              className="flex  hover:text-red-400 relative cursor-pointer justify-center items-center text-[20px] font-mono font-[700]  gap-[5px]"
            >
              <IoSearch className="h-[20px] w-[20px]" />
              Search
            </button>
          </div>
        </nav>
      ) : (
        <div className=" h-[60px] flex w-[700px] z-20 bg-white p-[20px] justify-center items-center">
          <input
            onChange={setValueOfInput}
            type="text"
            className="focus:border-white border-[2px] border-black inpanimate h-[50px] text-[1rem] w-[650px]"
          />
          <IoClose
            className="cursor-pointer text-3xl text-gray-300 hover:text-black relative right-[40px]"
            onClick={setSearchValue}
          />
          <button onClick={fetchData}>
            <GoSearch className="font-[900] cursor-pointer relative right-[10px] text-2xl" />
          </button>
          {searchLoad && <SearchComponent response={response} />}
        </div>
      )}
    </div>
  );
};

export default Navbar;
