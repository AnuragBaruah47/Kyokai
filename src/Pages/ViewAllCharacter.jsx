import React, { useEffect, useState } from "react";
import CharactersPoster from "../Components/CharactersPoster";
import axios from "axios";
import { useParams, useSearchParams, NavLink } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loader from "../Components/Loader";

const ViewAllCharacter = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();



  useEffect(() => {
    (async () => {
      try {
        setError("");
        setLoading(true);
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/characters`
        );
        setResponse(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-black">
      <div className="h-auto w-[100vw] bg-black absolute top-[150px] flex justify-center">
        <div className="grid pb-[15px] bg-black gap-[15px] grid-cols-[repeat(5,230px)]">
          {response.map((each, index) => (

              <CharactersPoster
               key={index} 
                img={each?.character?.images?.webp?.image_url}
                name={each?.character?.name}
                role={each?.role}
                Mainvalue={each?.character?.mal_id}
              />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllCharacter;
