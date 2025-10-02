import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchLoader = () => {
  return (
    <div className="w-full flex justify-center">
    <div className="absolute z-[200] top-[61px] searchLoad w-[701px] h-[400px] flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
      <IoSearch className="searchIcon" />
    </div>
    </div>

  );
};

export default SearchLoader;
