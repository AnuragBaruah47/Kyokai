import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import Loader from "../Components/Loader";

import {
  extractMinutesPerEpisode,
  getRatingShort,
  first400Chars,
  formatToLocaleDate,
} from "../utill";
import CharaterCard from "../Components/CharaterCard";
import TestimonialCard from "../Components/TestimonialCard";
import ErrorPage from "./ErrorPage";

const EachAnime = () => {
  const [response, setResponse] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [more, setMore] = useState(false);
  const [character, setCharacter] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    console.log("Param changed:", id);
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        setloading(true);
        const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        const res2 = await axios.get(
          `https://api.jikan.moe/v4/seasons/upcoming?limit=10`
        );
        const res3 = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        );
        const res4 = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/reviews?preliminary=true`
        );
        setResponse(res.data.data);
        setUpcoming(res2.data.data);
        setCharacter(res3.data.data);
        setReviews(res4?.data?.data || []);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setloading(false);
      }
    })();
  }, [id]);

  if(error){
    return <div><ErrorPage/></div>
  }

  const setValueOfMore = () => setMore((prev) => !prev);

  const returnMaiChar = () => {
    if (character) {
      return character?.filter((each) => each.role == "Main");
    }
  };
  const mainCharacter = returnMaiChar();

  if (reviews) {
    reviews.map((each) => {
    });
  }

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="text-white font-mono p-10">
        {error ? error : "No Data Found"}
      </div>
    );
  }

  return (
    <div className="h-[545px] bg-black gap-[150px] text-white top-[150px] relative w-[100vw]">
      <div className="flex gap-[150px]">
        <div className="flex w-auto ml-[60px] gap-[30px]">
          {response?.images?.webp?.image_url && (
            <div className="h-[270px] w-[180px] border-[1px] border-black">
              <img
                className="h-[270px] w-[180px]"
                src={response.images.webp.image_url}
                alt={response.title || "anime poster"}
              />
            </div>
          )}

          <div>
            <div className="text-[16px] flex font-[900] font-mono">
              {response?.season && <span>{response.season}</span>}
              {response?.type && (
                <span className="ml-2">| {response.type}</span>
              )}
              {response?.title && (
                <div className="ml-[10px] text-[rgba(255,255,255,0.5)]">
                  {response.title}
                </div>
              )}
            </div>

            {response?.title_english && (
              <div className="text-4xl font-mono mt-[10px] font-[900]">
                {response.title_english}
              </div>
            )}

            <div className="mt-[20px] gap-[10px] flex flex-wrap">
              {response?.rating && (
                <div className="bg-white rounded-[5px] px-[10px] flex items-center font-mono font-[900] text-black">
                  {getRatingShort(response.rating)}
                </div>
              )}
              {response?.episodes && (
                <div className="bg-green-500 rounded-[5px] px-[10px] flex items-center font-mono font-[900] text-black">
                  {response.episodes} EP
                </div>
              )}
              {Array.isArray(response?.demographics) &&
                response.demographics.length > 0 &&
                response.demographics.map((each, index) => (
                  <div
                    key={index}
                    className="bg-red-500 rounded-[5px] px-[10px] flex items-center font-mono font-[900] text-white"
                  >
                    {each?.name}
                  </div>
                ))}
              {response?.score && (
                <div className="bg-yellow-500 rounded-[5px] px-[10px] flex items-center font-mono font-[900] text-black">
                  {response.score}
                </div>
              )}
              {response?.duration == "Unknown" ? (
                <div></div>
              ) : (
                <div className="bg-blue-500 rounded-[5px] px-[10px] flex items-center font-mono font-[900] text-white">
                  {`${extractMinutesPerEpisode(response.duration)}mins`}
                </div>
              )}
            </div>

            <div className="mt-[20px] h-[33px] w-[163px]">
              <button className="h-[30px] border border-white w-[160px] bg-[#676666] hover:text-green-300 transition-all ease-in-out text-white rounded-[5px] font-mono mt-[10px] font-[900] hover:cursor-pointer">
                Add to Bookmark
              </button>
            </div>

            {response?.synopsis && (
              <div className="w-[700px] font-mono font-[900] mt-[30px]">
                {more
                  ? response.synopsis
                  : `${first400Chars(response.synopsis)}...`}
                <button
                  className="cursor-pointer ml-[5px]"
                  onClick={setValueOfMore}
                >
                  {more ? "less" : "more"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="h-auto w-[350px]  mr-[30px] text-[17px] font-mono">
          {response?.title_japanese && (
            <div>Name: {response.title_japanese}</div>
          )}
          {response?.title_synonyms?.length > 0 && (
            <div className="flex">
              Synonyms:
              <div className="flex flex-wrap">
                {response.title_synonyms.join(", ")}
              </div>
            </div>
          )}
          {response?.aired?.from && (
            <div className="tracking-tighter">
              Aired: from {formatToLocaleDate(response.aired.from)}{" "}
              {response?.aired?.to && (
                <> to {formatToLocaleDate(response.aired.to)}</>
              )}
            </div>
          )}
          {response?.year && <div>Premiered: {response.year}</div>}
          {response?.status && <div>Status: {response.status}</div>}
          {response?.popularity && (
            <div>Popularity: #{response.popularity}</div>
          )}
          {response?.duration && <div>Duration: {response.duration}</div>}

          {response?.genres?.length > 0 && (
            <div className="flex">
              Genre:
              <div className="flex text-[16px] flex-wrap">
                {response.genres.map((each, index) => (
                  <div key={index} className="pl-[2px] pr-[2px]">
                    {each?.name},
                  </div>
                ))}
              </div>
            </div>
          )}

          {response?.studios?.length > 0 && (
            <div>
              Studio: {response.studios.map((each) => each?.name).join(", ")}
            </div>
          )}

          {response?.producers?.length > 0 && (
            <div className="flex">
              <div>Producers:</div>
              {response.producers.map((each) => each?.name).join(", ")}
            </div>
          )}
        </div>
      </div>
      {character.length != 0 && (
        <div className=" mt-[50px] bg-black absolute h-auto w-full ">
          <h1 className="flex flex-col items-center justify-center text-4xl font-mono text-white">
            Faces of the Story
            <div>
              <NavLink to={`/viewallchar/${id}`}>
              <button className="text-[16px] cursor-pointer hover:text-green-600 font-[900]">
                View More {">"}
              </button>
              </NavLink>

            </div>
          </h1>
          <div className="flex mt-[20px] mb-5 w-full justify-center">
            <div className="grid grid-cols-[repeat(3,410px)] gap-[10px]">
              {mainCharacter.map((each, index) => {
                return (
                  <CharaterCard
                    key={index}
                    name={each?.character?.name}
                    imgUrl={each?.character.images?.webp?.image_url}
                    role={each?.role}
                  />
                );
              })}
            </div>
          </div>
          {reviews?.length > 0 ? (
            <div className=" bg-black absolute h-auto w-full ">
              <h1 className="flex flex-col items-center justify-center text-4xl font-mono text-white">
                What Fans Are Saying
                <div>
                  <NavLink to={`/reviews/${id}`}>
                  <button className="text-[16px] cursor-pointer hover:text-green-600 font-[900]">
                    View More {">"}
                  </button>
                  </NavLink>
                </div>
              </h1>

              <div className="w-full  flex justify-center">
                <div className="mt-[30px] gap-[20px] grid grid-cols-[repeat(3,450px)] bg-black">
                  {reviews.map((each, index) => {
                    return (
                     
                        <TestimonialCard
                          response={each.review}
                          score={each.score}
                          key={index}
                        />
                    
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default EachAnime;
