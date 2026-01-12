import React, { useState } from "react";
import { useGetAnimeBySearch } from "../Queries/Hooks";
import useDebounce, {
  first200Chars,
  TrunNameChars,
  TrunNameChars2,
} from "../Utils";
import { IoMdClose } from "react-icons/io";

const SearchComponent = ({ animeName, animePhoto, animeSynopsis }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-3xl text-2xl flex gap-5 font-semibold max-h-96 p-5 bg-white border-2 shadow-[5px_5px_0_black]">
        <img
          src={animePhoto}
          className="h-33 w-30 shadow-[5px_5px_0_black]"
          alt=""
        />
        <div className="flex gap-1 flex-col">
          {TrunNameChars2(animeName)}
          <p className="text-xl">{first200Chars(animeSynopsis)}...</p>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
