import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { first400Chars } from "../utill";
import CharaterCard from "../Components/CharaterCard";

const EachCharacter = () => {
  const [searchParams] = useSearchParams();
  const idKeyword = searchParams.get("keyword");
  console.log(idKeyword);

  const [response, setResponse] = useState([]);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [animeImage, setAnimeImage] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [voiceActors, setVoiceActors] = useState([]);
  const [more, setMore] = useState(false);
  console.log(idKeyword);

  const setValueOfMore = () => setMore((prev) => !prev);

  useEffect(() => {
    (async () => {
      setloading(true);
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/characters/${idKeyword}`
        );
        const res2 = await axios.get(
          `https://api.jikan.moe/v4/characters/${idKeyword}/voices`
        );
        const res3 = await axios.get(
          `https://api.jikan.moe/v4/characters/${idKeyword}/pictures`
        );
        setResponse(res.data.data);
        setVoiceActors(res2.data.data);
        setAnimeImage(res3.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setloading(false);
      }
    })();
  }, [idKeyword]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-[100vh] text-white flex w-[100vw] bg-black">
      <div className="h-auto absolute top-[150px] w-full bg-black">
        <div className="flex bg-black mb-[20px] h-auto justify-center gap-[20px] w-full">
          <div className="bg-black h-[350px]">
            <img
              src={
                response &&
                response.images &&
                response.images.webp &&
                response.images.webp.image_url
              }
              className="h-[350px] w-[250px]"
              alt=""
            />
          </div>
          <div className="font-sans bg-black mb-[10px] font-[700]">
            <h1 className="text-[28px]">{response && response.name}</h1>
            <h1 className="text-[28px]">{response && response.name_kanji}</h1>
            <div className="flex flex-row mb-[10px] gap-[10px] text-[18px]">
              NickNames :
              {response &&
                response.nicknames &&
                response.nicknames.map((each, index) => {
                  return <h1 key={index}>{each}</h1>;
                })}
            </div>

            <div className="bg-black w-full">
              <div className="w-[700px] font-mono font-[900]">
                {more
                  ? response && response.about
                  : `${first400Chars(response && response.about)}...`}
                <button
                  className="cursor-pointer ml-[5px]"
                  onClick={setValueOfMore}
                >
                  {more ? "less" : "more"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-[40px] w-full flex justify-center text-5xl font-sans font-[700]">
          <h1>Behind the Voices</h1>
        </div>

        <div className="w-full flex justify-center bg-black items-center">
          <div className="grid grid-cols-[repeat(3,410px)] gap-[10px] bg-black">
            {voiceActors &&
              voiceActors.map((each, index) => {
                return (
                  <CharaterCard
                    key={index}
                    name={
                      each &&
                      each.person &&
                      each.person.name
                    }
                    imgUrl={
                      each &&
                      each.person &&
                      each.person.images &&
                      each.person.images.jpg &&
                      each.person.images.jpg.image_url
                    }
                    role={each && each.language}
                  />
                );
              })}
          </div>
        </div>

        <div className="mb-[20px]">
          <div className="mb-[40px] mt-[40px] w-full flex justify-center text-5xl font-sans font-[700]">
            <h1>Image Vault</h1>
          </div>
          <div className="w-full flex justify-center bg-black">
            <div className="grid gap-[10px] grid-cols-[repeat(5,220px)]">
              {animeImage &&
                animeImage.map((each, index) => {
                  return (
                    <img
                      key={index}
                      src={
                        each &&
                        each.jpg &&
                        each.jpg.image_url
                      }
                      className="h-[350px] w-[220px]"
                      alt="home"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachCharacter;
