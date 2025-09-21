import React, { useEffect, useState } from "react";
import { useGetAllAnime } from "../CustomHooks";
import Card from "../Components/Card";

const AllAnime = () => {
  const baseUrl = "https://api.jikan.moe/v4/anime?limit=16";
  

  const [response, loading, error] = useGetAllAnime(baseUrl);

  console.log(response[0]?.synopsis);
  

  

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="h-[100vh] bg-black w-[100vw] flex justify-center items-center">

        <Card
        description={response[0]?.synopsis}
          imgUrl={response[0]?.images?.webp?.image_url}
          titleEnglish={response[0]?.title_english}
          titleJapanese={response[0]?.title_japanese}
          animeStatus={response[0]?.status}
          rank={response[0]?.rank}
          genre1={response[2]?.genres[0]?.name}
          genre2={response[2]?.genres[1]?.name}
          genre3={response[2]?.genres[2]?.name}
        />
    </div>
  );
};

export default AllAnime;
