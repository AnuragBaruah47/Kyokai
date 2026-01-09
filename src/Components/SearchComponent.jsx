import React, { useState } from "react";
import { useGetAnimeBySearch } from "../Queries/Hooks";
import useDebounce from "../Utils";

const SearchComponent = ({ value }) => {
  const [keyword, setKeyWord] = useState("");
  const debouncedData = useDebounce(keyword, 600);
  const { data, isLoading, isError, error } =
    useGetAnimeBySearch(debouncedData);
  console.log(data);

  return (
    <div>
      <input onChange={(e) => setKeyWord(e.target.value)} />
    </div>
  );
};

export default SearchComponent;
