import React from "react";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Card from "../Components/Card";

const UpcomingAnime = () => {
  const [response, setResponse] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setloading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/seasons/upcoming?page=${page}&limit=25`
        );
        setResponse(res.data.data);
        setloading(false);
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
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-black h-[100vh] w-[100vw]">
      <div className="relative bg-[#000000] top-[150px]">
        <div className="flex justify-center items-center">
          <div className=" gap-[10px] grid grid-rows-[repeat(5,340px)] grid-cols-[repeat(5,230px)]">
            {response.map((a, index) => {
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
          {page > 1 && (
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

export default UpcomingAnime;
