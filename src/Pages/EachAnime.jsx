import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import {
  extractMinutesPerEpisode,
  getRatingShort,
  first400Chars,
} from "../utill";

const EachAnime = () => {
  const [response, setResponse] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [more, setMore] = useState(false);
  const param = useParams();

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${param.id}`
        );
        console.log(res.data);
        setResponse(res.data.data);
        setloading(false);
      } catch (error) {
        setError(error);
      } finally {
        setloading(false);
      }
    })();
  }, []);

  const setValueOfMore = () => {
    if (more === false) {
      setMore(true);
    } else {
      setMore(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (response) {
  }

  return (
    <div
      className="h-[100vh] flex gap-[30px]
     bg-[#1a1a1a] 
            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)] text-white relative w-[100vw]"
    >
      <div className="flex ml-[60px] gap-[30px]">
        <div className="h-[270px] w-[180px] border-[1px] border-black">
          <img
            className="h-[270px] w-[180px]"
            src={response.images?.webp?.image_url}
            alt="home"
          />
        </div>
        <div>
          <div className="text-[16px] flex font-[900] font-mono">
            {response?.season} | {response?.type} |
            <div className="ml-[10px] text-[rgba(255,255,255,0.5)]">
              {response?.title_english}
            </div>
          </div>
          <div className="text-4xl font-mono mt-[10px] font-[900]">
            {response?.title}
          </div>
          <div>
            <div className="mt-[20px] gap-[10px] flex">
              <div className="bg-white rounded-[5px] w-auto pl-[10px] pr-[10px] flex justify-center items-center font-mono font-[900] text-black">
                {getRatingShort(response?.rating)}
              </div>
              <div className="bg-green-500 rounded-[5px] w-auto pl-[10px] pr-[10px] flex justify-center items-center font-mono font-[900] text-black">
                {response?.episodes}EP
              </div>
              <div className="bg-red-500 rounded-[5px] w-auto pl-[10px] pr-[10px] flex justify-center items-center font-mono font-[900] text-white">
                {response?.demographics?.map((each) => {
                    if(each.name){
                      return each.name
                    }else{
                      return "Unknown"
                    }
                })}
              </div>
              <div className="bg-yellow-500 rounded-[5px] w-auto pl-[10px] pr-[10px] flex justify-center items-center font-mono font-[900] text-black">
                {response?.score}
              </div>
              <div className="bg-blue-500 rounded-[5px] w-auto pl-[10px] pr-[10px] flex justify-center items-center font-mono font-[900] text-white">
                {extractMinutesPerEpisode(response?.duration)}mins
              </div>
            </div>
            <div className="mt-[20px]">
              <button
                className="h-[30px] border-[1px] border-white w-[160px] bg-[#676666]  hover:cursor-pointer hover:text-green-300 hover:h-[32px] hover:w-[162px] transition-all ease-in-out  text-white rounded-[5px]
              font-mono mt-[10px] font-[900]"
              >
                Add to Bookmark
              </button>
            </div>
            {more === false ? (
              <div className="w-[850px] font-mono font-[900] mt-[20px] h-auto">
                {first400Chars(response?.synopsis)}...
                <button
                  className="cursor-pointer ml-[5px]"
                  onClick={setValueOfMore}
                >
                  {more === false ? "more" : "less"}
                </button>
              </div>
            ) : (
              <div className="w-[850px] font-mono font-[900] mt-[20px] h-auto">
                {response?.synopsis}...
                <button
                  className="cursor-pointer ml-[5px]"
                  onClick={setValueOfMore}
                >
                  {more === false ? "more" : "less"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" w-[350px] h-[550px] left-[100px]">Box</div>
    </div>
  );
};

export default EachAnime;
