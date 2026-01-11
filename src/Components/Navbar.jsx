import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";

import { CiBookmark } from "react-icons/ci";

import { SlCalender } from "react-icons/sl";

import { IoMdSearch, IoMdClose } from "react-icons/io";
import { useGetAnimeBySearch } from "../Queries/Hooks";
import useDebounce from "../Utils";
import Loader from "./Loader";
import SearchComponent from "./SearchComponent";

const Navbar = () => {

  const [search, setSearch] = React.useState(false);
  const [keyword, setKeyWord] = useState("");
  const debouncedData = useDebounce(keyword, 600);
  const { data, isLoading, isError, error } =
    useGetAnimeBySearch(debouncedData);
  console.log(data);

  const elements = [
    { label: "Home", icon: IoHomeOutline, path: "/" },
    { label: "Bookmarks", icon: CiBookmark, path: "/Bookmarks" },
    { label: "Upcoming Anime", icon: SlCalender, path: "/UpcomingAnime" },
    { label: "Search", icon: IoMdSearch }, // No path here
  ];

  const toggleSearch = () => {
    setSearch((prev) => !prev);
    if(search === false){
      setKeyWord("")
    }
  };

  return (
    <div>
      {search === false ? (
        <nav className="flex justify-center w-full">
          <ul className="flex bg-white border-2 shadow-[8px_8px_0_#000] rounded-md border-black max-w-3xl w-full justify-between items-center gap-5 px-4">
            {elements.map((e) => {
              // Define common styles to keep code DRY (Don't Repeat Yourself)
              const contentStyles =
                "text-xl flex font-semibold justify-center items-center gap-2 cursor-pointer";

              return (
                <li
                  key={e.label}
                  className="p-3.5 active:scale-90 hover:scale-105 transition-all ease-in-out duration-300"
                >
                  {e.path ? (
                    <Link to={e.path} className={contentStyles}>
                      <e.icon />
                      {e.label}
                    </Link>
                  ) : (
                    <button onClick={toggleSearch} className={contentStyles}>
                      <e.icon />
                      {e.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      ) : (
        <div>
          <div className="w-full flex justify-center">
            <input
              onChange={(e) => setKeyWord(e.target.value)}
              className="flex relative bg-white border-2 shadow-[8px_8px_0_#000] rounded-md h-15 border-black max-w-3xl w-full justify-between items-center gap-5 px-4"
            />
            <IoMdClose
              onClick={toggleSearch}
              className="text-3xl cursor-pointer relative right-10 top-3"
            />
          </div>
          <div className="relative top-3 right-3">
            {keyword && data?.map((each)=>{
              return <Link onClick={toggleSearch} to={`anime/${each.mal_id}`}>
                <SearchComponent animePhoto={each?.images?.webp?.large_image_url}
                animeName={each.title_english? each.title_english : each.title_japanese}
                animeSynopsis={each.synopsis}/>
              </Link>
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
