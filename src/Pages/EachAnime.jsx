import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAnimeCharacters, useGetEachAnime } from "../Queries/Hooks";
import Loader from "../Components/Loader";
import { first300Chars } from "../Utils";
import CharacterCard from "../Components/CharacterCard";

const EachAnime = () => {
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const { data, isLoading, isError, error } = useGetEachAnime(id);
  const {
    data: data2,
    isLoading: isLoading2,
    error: error2,
    isError: isError2,
  } = useAnimeCharacters(id);

  if (isLoading) {
    return <Loader />;
  }
  if (isLoading2) {
    return <Loader />;
  }

  const setValueOfMore = () => {
    setMore((prev) => !prev);
  };



  return (
    <div className="min-h-screen w-screen flex relative top-45 justify-center">
      <div className="h-max flex justify-center w-[90%] border-2 shadow-[10px_10px_0_#000] rounded-md bg-white square">
        <div className="flex mt-10">
          {data.images.webp.large_image_url && (
            <div className="">
              <img
                src={data.images.webp.large_image_url}
                className="max-h-96 h-96 border-2 shadow-[5px_5px_0_#000]"
                alt="anime"
              />
             
            </div>
          )}
          <div className="text-5xl mb-12 w-3xl mx-6 max-w-3xl font-semibold ">
            <div className="flex flex-col gap-6">
              {data.titles.find((e) => e.type === "English")?.title && (
                <h1 className="bg-white shadow-[5px_5px_0_#000] border-2 p-4">
                  {data.titles.find((e) => e.type === "English")?.title}
                </h1>
              )}
              {data.titles.find((e) => e.type === "Japanese")?.title && (
                <h1 className="bg-white shadow-[5px_5px_0_#000] border-2 p-4">
                  {data.titles.find((e) => e.type === "Japanese")?.title}
                </h1>
              )}
              <div className="flex gap-5">
                {data.episodes && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    {data.episodes}ep
                  </h1>
                )}
                {data.duration && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    {data.duration}
                  </h1>
                )}
                {data.status && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    {data.status}
                  </h1>
                )}
                {data.season && data.year && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    {data.season}
                    <span className="ml-2">{data.year}</span>
                  </h1>
                )}
              </div>
              <div className="flex gap-5">
                {data.aired.string && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    From {data.aired.string}
                  </h1>
                )}
                {data.rank && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    Rank {data.rank}
                  </h1>
                )}
              </div>

              <div className="flex gap-5">
                {data.rating && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    From {data.rating}
                  </h1>
                )}
                {data.score && (
                  <h1 className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                    Score : {data.score}
                  </h1>
                )}
              </div>
              {data.synopsis && (
                <p className="bg-white text-2xl w-fit shadow-[5px_5px_0_#000] border-2 p-4">
                  {more === true ? data.synopsis : first300Chars(data.synopsis)}{" "}
                  <span className="-ml-1">{!more && "..."}</span>
                  <i
                    onClick={setValueOfMore}
                    className="hover:underline ml-3 active:shadow-none cursor-pointer transition-all ease-in-out font-semibold text-2xl w-fit rounded-md bg-white"
                  >
                    {more === true ? "show less" : "show more"}
                  </i>
                </p>
              )}
            </div>
          </div>

          <div className="border-2 h-fit mb-12 shadow-[5px_5px_0_rgba(0,0,0,1)] w-md max-w-xl">
            <h1 className="border-2 w-full flex justify-center text-3xl font-semibold shadow-[5px_5px_0_rgba(0,0,0,1)]">
              Faces of the show
            </h1>
            {data2
              .filter((e) => e.role === "Main")
              .map((e) => (
                <div className="flex flex-col" key={e.character.name}>
                  <CharacterCard name={e.character.name} images={e.character.images.webp.image_url} /></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachAnime;
