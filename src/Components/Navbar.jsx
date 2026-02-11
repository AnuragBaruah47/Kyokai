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

  const elements = [
    { label: "Home", icon: IoHomeOutline, path: "/" },
    { label: "Bookmarks", icon: CiBookmark, path: "/Bookmarks" },
    { label: "Forums", icon: SlCalender, path: "/UpcomingAnime" },
    { label: "Search", icon: IoMdSearch }, // No path here
  ];

  const toggleSearch = () => {
    setSearch((prev) => !prev);
    if (search === false) {
      setKeyWord("");
    }
  };

  return (
    <div>
      {search === false ? (
        <nav className="flex justify-center w-full">
          <ul className="flex bg-white border-2 shadow-[8px_8px_0_#000] rounded-md border-black w-3xl justify-between items-center gap-5 h-16 px-4">
            {elements.map((e) => {

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
          <div className="relative w-full flex justify-center">
            <input
              onChange={(e) => setKeyWord(e.target.value)}
              className="
      w-3xl
      h-16
      bg-white
      border-2 border-black
      shadow-[8px_8px_0_#000]
      rounded-md
      px-4
      pr-12
    "
            />

            <IoMdClose
              onClick={toggleSearch}
              className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-2xl
      cursor-pointer
    "
            />
          </div>
          <div className="relative top-3 right-3">
            {keyword &&
              data?.map((each) => {
                return (
                  <Link onClick={toggleSearch} to={`anime/${each.mal_id}`}>
                    <SearchComponent
                      animePhoto={each?.images?.webp?.large_image_url}
                      animeName={
                        each.title_english
                          ? each.title_english
                          : each.title_japanese
                      }
                      animeSynopsis={each.synopsis}
                    />
                  </Link>
                );
              })}
            {keyword && (
              <div className="w-full flex justify-center">
                <Link onClick={toggleSearch} to={`viewall?q=${debouncedData}`}>
                  <button className="w-3xl flex justify-center cursor-pointer border-2 active:shadow-none transition-all ease-in-out  shadow-[5px_5px_0_#000] font-semibold px-2 py-2 rounded-md bg-white">
                    View all results
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
