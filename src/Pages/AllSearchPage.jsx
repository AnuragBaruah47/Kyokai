import React, { useEffect, useState } from "react";
import { useGetAllAnimeBySearch } from "../Queries/Hooks";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import AnimeCard from "../Components/AnimeCard";

const AllSearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useGetAllAnimeBySearch(
    keyword,
    page
  );


  useEffect(() => {
    setPage(1);
  }, [keyword]);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex relative justify-center">
      <div className="flex flex-col gap-42 ">
        <div className="p-5 grid justify-center gap-4 grid-cols-[repeat(5,290px)] bg-white h-fit relative top-40 border-2 w-auto shadow-[5px_5px_0_rgba(0,0,0,1)]">
          {data.data.map((each) => {
            return (
        <Link to={`/anime/${each.mal_id}`} key={each.title}>
                <AnimeCard
                  imageUrl={each?.images?.webp?.large_image_url}
                  title={each.title}
                  type={each?.type}
                  status={each.status}
                  ratings={each?.rating}
                  popularity={each?.popularity}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center gap-5">
          {page > 1 && (
            <button
              onClick={prevPage}
              className="  cursor-pointer border-2 active:shadow-none transition-all ease-in-out  shadow-[5px_5px_0_#000] mb-5 font-semibold px-12 py-3 rounded-md bg-white"
            >
              Prev
            </button>
          )}
          {data.pagination.has_next_page && (
            <button
              onClick={nextPage}
              className="mb-5 active:shadow-none border-2 cursor-pointer transition-all ease-in-out shadow-[5px_5px_0_#000] font-semibold px-12 py-3 rounded-md bg-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSearchPage;
