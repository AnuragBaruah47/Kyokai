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
      {imgUrl? (      <img
        src={imgUrl}
        className="h-[340px] w-[230px] rounded-2xl"
        alt="home"
      />) : <Loader/>}
      <div className="text-white hover:border-green-500 hover:bg-[rgba(0,0,0,0.8)] rounded-2xl h-[340px] w-[230px] absolute opacity-0 hover:opacity-[1]  border-2 z-10 text-[30px] font-mono transition-all ease-in-out hover:cursor-pointer font-[800] flex justify-center">
        <div className="h-[40px] w-[40px] m-[4px] text-[1.2rem] text-white absolute right-0 bg-orange-700 rounded-4xl flex justify-center items-center">
          {getRatingShort(rating)}
        </div>
        <div className="absolute bottom-[10px] tracking-tighter text-[1.2rem]  border-white ml-[10px] ">
          {titleEnglish ? titleEnglish : "Unknown"}
        </div>
        <div className=" p-[5px] bg-orange-700 top-[5px] text-[20px] font-mono font-[700]  rounded-[5px] absolute left-[10px]">
          {episodes > 1 ? `${episodes}E` : "Movie"}
        </div>
      </div>
    </div>
  );
};

export default Card;
