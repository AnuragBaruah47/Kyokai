import React, { useState } from "react";
import {
  useGetAllAnime,
  useGetEachAnime,
  useGetTopAnime,
} from "../Queries/Hooks";
import { useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchComponent from "../Components/SearchComponent";
import Loader from "../Components/Loader";
import AnimeCard from "../Components/AnimeCard";

const AllAnime = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigation();

  const {
    data: allAnime,
    isLoading,
    isError,
    error,
  } = useGetAllAnime(page, 25);
  const {
    data: top5Animes,
    isLoading: topAnimeLoading,
    isError: topAnimeIsError,
    error: topAnimeError,
  } = useGetTopAnime(5, 1);
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative w-full top-40 flex flex-col justify-center">
      <div className="grid w-full gap-2 justify-center p-4 grid-cols-[repeat(5,330px)]">
        {allAnime?.map((each, index) => {
          return (
            <Link key={index} to={`${each.mal_id}`}>
              <div className="m-2">
                <AnimeCard
                  imageUrl={each?.images?.webp?.large_image_url}
                  title={each.title}
                  type={each?.type}
                  status={each.status}
                  ratings={each?.rating}
                  popularity={each?.popularity}
                />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5 pb-5 justify-center">
        {page > 1 && (
          <button
            onClick={prevPage}
            className=" disabled:shadow-none cursor-pointer border-2 active:shadow-none transition-all ease-in-out  shadow-[5px_5px_0_#000] font-semibold px-12 py-3 rounded-md bg-white"
          >
            Prev
          </button>
        )}
        <button
          onClick={nextPage}
          className="active:shadow-none border-2 cursor-pointer transition-all ease-in-out shadow-[5px_5px_0_#000] font-semibold px-12 py-3 rounded-md bg-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllAnime;
