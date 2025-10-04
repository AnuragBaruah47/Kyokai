import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";

const EachCharacter = () => {
  const [searchParams] = useSearchParams();
  const idKeyword = searchParams.get("keyword");
  console.log(idKeyword);
  
  const [response, setResponse] = useState([]);
  const [animeInfo, setAnimeInfo] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [voiceActors, setVoiceActors] = useState([]);
  console.log(idKeyword);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/characters/${idKeyword}`
        );
        setResponse(res.data.data);
      } catch (error) {}
    })();
  }, [idKeyword]);

  if(loading){
    return <div><Loader/></div>
  }

  return (
    <div className="h-[100vh] flex justify-center items-center text-white w-[100vw] bg-black">
      <img src={response?.images?.webp.image_url} alt="" />
      <h1>{response?.name}</h1>
      <h1>{response?.name_kanji}</h1>
      <p className="text-white">{response?.about}</p>
    </div>
  );
};

export default EachCharacter;
