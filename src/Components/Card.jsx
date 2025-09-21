import React from "react";
import { getRatingShort } from "../utill";

const Card = ({
  description,
  imgUrl,
  titleEnglish,
  titleJapanese,
  animeStatus,
  rating,
}) => {

  return (
    <div className="h-[340px] w-[230px] relative flex-col rounded-2xl mt-[5px] flex justify-center items-center">
      <img src={imgUrl} className="h-max w-max rounded-2xl" alt="home" />
      <div className="text-white hover:border-white hover:bg-[rgba(0,0,0,0.8)] rounded-2xl h-[340px] w-[230px] absolute opacity-0 hover:opacity-[1]  border-2 z-10 text-[30px] font-mono transition-all ease-in-out hover:cursor-pointer font-[800] flex justify-center">
        <div className="h-[40px] w-[40px] m-[4px] text-[1.2rem] text-black absolute right-0 bg-white rounded-4xl flex justify-center items-center">{getRatingShort(rating)}</div>
        <div className="absolute bottom-[10px] ">{(titleEnglish)? titleEnglish : "Unknown"}</div>
      </div>
    </div>
  );
};

export default Card;
