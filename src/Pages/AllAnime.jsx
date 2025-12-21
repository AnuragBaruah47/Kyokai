import React, { useState } from "react";
import { useGetAllAnime, useGetEachAnime, useGetTopAnime } from "../Queries/Hooks";
import { useNavigation } from "react-router-dom";
import { Link } from "react-router-dom";

const AllAnime = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigation()

  const { data : allAnime, isLoading, isError, error } = useGetAllAnime(page, 25);
  const {data:top5Animes , isLoading : topAnimeLoading , isError : topAnimeIsError , error : topAnimeError} = useGetTopAnime(5,1)
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      {allAnime?.map((each, index) => {
        return <Link to={`${each.mal_id}`}><div key={index}>{each.title}</div></Link>;
      })}
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default AllAnime;
