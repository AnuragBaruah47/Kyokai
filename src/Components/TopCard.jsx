import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { MdOutlineInfo } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";

const TopCard = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [number, setNumber] = useState(0);
  const numberArray = [0, 1, 2, 3, 4];

  useEffect(() => {
    (async () => {
      try {
        const top = await axios.get(
          "https://api.jikan.moe/v4/top/anime?limit=5"
        );
        setTopAnime(top.data.data);
      } catch (err) {
        console.log(err.message || "Something went wrong");
      }
    })();
  }, []);


  

  return (
    <div className="h-[400px] relative z-0 w-[800px]">
      <div className="h-[400px] w-[800px] z-[20] bg-[rgba(0,0,0,0.8)] absolute flex justify-center items-center"></div>
      <div className="bg-red-700 flex justify-center items-center h-[35px] w-[150px] text-[16px] top-[20px] left-[20px] font-sans font-[900] text-white rounded-[5px] absolute z-[22]">
        
      </div>
      <div className="absolute z-[22] text-4xl top-[100px] font-mono left-[20px] font-[900] text-white">
        {topAnime[number]?.title}
      </div>
      <div>
        <div className="absolute top-[170px] tracking-wide left-[20px] text-gray-400 z-[22] h-[95px] text-[16px] font-[900] font-serif w-[500px] overflow-clip">
          {topAnime[number]?.synopsis}
        </div>
      </div>
      <div className="absolute top-[70px]">
        <button className="flex justify-center border-[1px] border-black items-center absolute z-[22] hover:h-[42px] hover:w-[132px] transition-all ease-in-out bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.8)]  rounded-[5px] top-[250px] font-mono left-[20px] h-[40px] w-[130px] hover:cursor-pointer  font-[900] gap-1w text-white">
          <MdOutlineInfo />
          Info
        </button>
        <button className="flex justify-center border-[1px] border-black items-center absolute z-[22] hover:h-[42px] hover:w-[132px] transition-all ease-in-out bg-[rgba(0,0,0,0.4)] hover:bg-[rgba(0,0,0,0.8)]  rounded-[5px]  top-[250px] font-mono left-[170px] h-[40px] w-[130px] hover:cursor-pointer  font-[900] gap-1w text-white">
          <FaRegBookmark />
          Bookmark
        </button>
      </div>

      <img
        src={topAnime[number]?.images?.webp?.image_url}
        alt="home"
        className="h-[400px] w-[800px] absolute z-0"
      />
    </div>
  );
};

export default TopCard;
