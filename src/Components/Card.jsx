import React from "react";
import { getRatingShort } from "../utill";
import Loader from "./Loader";

const Card = ({
  description,
  imgUrl,
  titleEnglish,
  titleJapanese,
  animeStatus,
  rating,
  episodes,
}) => {
  return (
    <div className="h-[340px] w-[230px] border-2 border-white relative flex-col rounded-2xl mt-[5px] flex justify-center items-center">

      {imgUrl ? (
        <img
          src={imgUrl}
          className="h-[340px] w-[230px] rounded-2xl"
          alt={titleEnglish || titleJapanese || "anime poster"}
        />
      ) : (
        <Loader />
      )}


      <div className="text-white hover:border-green-500 hover:bg-[rgba(0,0,0,0.8)] rounded-2xl h-[340px] w-[230px] absolute opacity-0 hover:opacity-100 border-2 z-10 text-[30px] font-mono transition-all ease-in-out hover:cursor-pointer font-[800] flex justify-center">
  
        {rating && (
          <div className="h-[40px] w-[40px] m-[4px] text-[1.2rem] text-white absolute right-0 bg-orange-700 rounded-4xl flex justify-center items-center">
            {getRatingShort(rating)}
          </div>
        )}

        <div className="w-[200px] tracking-tighter text-[1.2rem] flex justify-center items-center absolute bottom-[10px]">
          {titleEnglish || titleJapanese || "Unknown"}
        </div>

        {episodes !== undefined && episodes !== null ? (
          <div className="p-[5px] bg-orange-700 top-[5px] text-[20px] font-mono font-[700] rounded-[5px] absolute left-[10px]">
            {episodes > 0 ? `${episodes}E` : "Movie"}
          </div>
        ) : null}

        {animeStatus && (
          <div className="absolute top-[50px] left-[10px] text-[14px] bg-gray-700 px-2 py-1 rounded font-mono">
            {animeStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
