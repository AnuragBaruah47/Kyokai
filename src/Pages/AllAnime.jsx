import React, { useEffect, useState } from "react";
import { useGetAllAnime } from "../CustomHooks";
import Card from "../Components/Card";

const AllAnime = () => {
  const baseUrl = "https://api.jikan.moe/v4/anime?limit=9";

  const [response, loading, error] = useGetAllAnime(baseUrl);

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="h-[100vh] bg-black w-[100vw] grid grid-cols-4 grid-rows-4">
      {response.map((a, index) => {
        return (
          <Card
            key={index}
            description={a?.synopsis}
            imgUrl={a?.images?.webp?.image_url}
            titleEnglish={a?.title_english}
            rating={a?.rating}
            rank={a?.rank}
          />
        );
      })}
    </div>
  );
};

export default AllAnime;
