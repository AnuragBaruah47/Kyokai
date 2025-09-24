import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import { NavLink } from "react-router-dom";
import Loader from "../Components/Loader";
import axios from "axios";
import TopCard from "../Components/TopCard";

const AllAnime = () => {
  const [response, setResponse] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const filterAnime = () => {
    if (response) {
      return response.filter((eachAnime) => eachAnime.rating !== "Rx - Hentai");
    }
  };

  const filteredAnime = filterAnime();

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setloading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime?limit=25&page=${page}`
        );
        const top = await axios.get(
          "https://api.jikan.moe/v4/top/anime?limit=5"
        );
        setResponse(res.data.data);
        setTopAnime(top.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setloading(false);
      }
    })();
  }, [page]);

  const addPage = () => {
    setPage(page + 1);
  };

  const decreasePage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (topAnime) {
    console.log(topAnime);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-[auto] w-[100vw] bg-[#000000]">
      <div className="h-auto relative z-0 justify-center items-center top-[150px]  flex gap-[20px] w-full">
        <TopCard/>
        <div className="h-[400px] w-[300px] border-2 border-white">Filters</div>
      </div>
      <div className="relative bg-[#000000] top-[200px]">
        <div className="flex justify-center items-center">
          <div className=" gap-[10px] grid grid-rows-[repeat(5,340px)] grid-cols-[repeat(5,230px)]">
            {filteredAnime.map((a, index) => {
              return (
                <NavLink key={index} to={`/anime/${a?.mal_id}`}>
                  <Card
                    description={a?.synopsis}
                    imgUrl={a?.images?.webp?.image_url}
                    titleEnglish={a?.title_english}
                    rating={a?.rating}
                    rank={a?.rank}
                    episodes={a?.episodes}
                  />
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className="flex h-[50px] gap-[30px] justify-center mt-[20px]">
          {page > 0 && (
            <button
              className="border-[1px] border-white h-[30px] rounded-[2px] font-sans font-[700] w-[100px] bg-green-500"
              onClick={decreasePage}
            >
              Previous
            </button>
          )}
          <button
            onClick={addPage}
            className="border-[1px] border-white hover:cursor-pointer h-[30px] rounded-[2px] font-sans font-[700] w-[100px] bg-green-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllAnime;
