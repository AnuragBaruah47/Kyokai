import React, { useEffect, useState } from "react";
import { useGetAllAnime } from "../CustomHooks";
import Card from "../Components/Card";
import { NavLink } from "react-router-dom";
import Loader from "../Components/Loader";



const AllAnime = () => {
  const baseUrl = "https://api.jikan.moe/v4/anime?limit=16";

  const [response, loading, error] = useGetAllAnime(baseUrl);



  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="h-[auto] w-[100vw] bg-black flex justify-center items-center">
      <div className=" border-2 gap-[10px] grid grid-rows-[repeat(4,340px)] grid-cols-[repeat(4,230px)]">
        {response.map((a, index) => {
          return (
            <NavLink to={`/anime/${a?.mal_id}`}>
            <Card
              key={index}
              description={a?.synopsis}
              imgUrl={a?.images?.webp?.image_url}
              titleEnglish={a?.title_english}
              rating={a?.rating}
              rank={a?.rank}
            />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AllAnime;
