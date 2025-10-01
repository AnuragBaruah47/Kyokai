import React, { useEffect, useState } from "react";
import { formatToLocaleDate, getRatingShort } from "../utill";
import { Link, useParams, useNavigate } from "react-router-dom";

const SearchComponent = ({ response,value }) => {
  if (!response || response.length === 0) return null;

  const {id} = useParams()
  useEffect(()=>{
   console.log("id");
    
  },[id])




  return (
    <div className="w-[701px] z-[100] bg-black">
      {response.slice(0, 3).map((anime, index) => (
        <Link key={index} to={`/anime/${anime?.mal_id}`}>
          <div
            className="bg-white flex items-center border border-gray-600 h-[150px] w-full hover:bg-gray-100"
          >
            <img
              src={anime?.images?.webp?.image_url}
              className="ml-[30px] h-[130px] w-[90px]"
              alt={anime?.title_english}
            />
            <div className="flex ml-[30px] gap-[10px] flex-col">
              <div className="font-[900] text-[20px] font-sans">
                {anime?.title_english}
              </div>
              <div className="font-[900] font-sans text-[rgba(0,0,0,0.4)]">
                {anime?.title_english}
              </div>
              <div className="flex gap-[10px] font-[900] font-sans text-[rgba(0,0,0,0.4)]">
                <div>{formatToLocaleDate(anime?.aired?.from)}</div>
                <div className="text-black">{anime?.type}</div>
                <div>{anime?.duration}</div>
                <div>{getRatingShort(anime?.rating)}</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <Link
        to={`/searchpage?keyword=${value}`}
        className="text-white flex items-center justify-center w-full text-[20px] font-[900] font-sans hover:cursor-pointer hover:text-green-500 h-[50px]"
      >
        View All Results
      </Link>
    </div>
  );
};

export default SearchComponent;
