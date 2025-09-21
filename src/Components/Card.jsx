import React from "react";

const Card = ({
  description,
  imgUrl,
  titleEnglish,
  titleJapanese,
  animeStatus,
  rank,
  genre1,
  genre2,
  genre3,
}) => {
  return (
    <div className="h-[500px] w-[360px] rounded-2xl  border-white bg-white">
      <div className="h-[300px] w-[360px] rounded-2xl mt-[5px] flex flex-col items-center">
        <img
          src={imgUrl}
          className="h-[300px] w-[350px] rounded-2xl"
          alt="home"
        />
      </div>
      <div className="flex ml-[10px] mr-[10px] gap-[17px] mt-[10px]">
        <div className="h-[30px] w-[100px] text-[16px] font-sans font-[500] border-[1px] flex justify-center items-center rounded-2xl border-black bg-black text-white">
          {genre1}
        </div>
        <div className="h-[30px] w-[100px] text-[16px] font-[500] border-[1px] flex justify-center items-center rounded-2xl border-black bg-black text-white">
          {genre2}
        </div>
        <div className="h-[30px] w-[100px] text-[16px] font-[500] border-[1px] flex justify-center items-center rounded-2xl border-black bg-black text-white">
          {genre3}
        </div>
      </div>
      <div>
        {titleEnglish}
        {titleJapanese}
      </div>
      <div>{animeStatus}</div>
      <div className="h-[100px] w-[360px] overflow-hidden">{description}</div>
    </div>
  );
};

export default Card;
