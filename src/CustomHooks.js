import axios from "axios";
import { useEffect, useState } from "react";


export const pageUrl = "https://api.jikan.moe/v4/anime?limit=10&page=10";

export const useGetAllAnime = (url) => {
  const [response, setResponse] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setError("");
        setloading(true);
        const res = await axios.get(url);
        setResponse(res.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setloading(false);
      }
    })();
  }, []);
  return [response, loading, error];
};
