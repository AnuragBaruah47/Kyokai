import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import ReviewCard from "../Components/ReviewCard";

const Reviews = () => {
  const [response, setResponse] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [nextPageValue, setNextPagevalue] = useState(true);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        setloading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews?preliminary=true&page=${page}`
        );
        setNextPagevalue(res.data.pagination.has_next_page);
        setResponse(res?.data?.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setloading(false);
      }
    })();
  }, [page]);

  //   if (response) {
  //     console.log(response[0].review);
  //   }

  const addPage = () => {
    if (nextPageValue == true) {
      setPage(page + 1);
    }
  };

  const decreasePage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  if (response) {
    console.log(response[0]);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-[100vh] w-[100vw] bg-black">
      <div className="absolute flex flex-col gap-[30px]  bg-black top-[150px]">
        {response.map((each, index) => {
          return <ReviewCard response={each} key={index} />;
        })}
        <div className="w-full mb-[40px] flex justify-center gap-[40px]">
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

export default Reviews;
