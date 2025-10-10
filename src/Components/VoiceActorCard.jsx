import React, { useEffect } from "react";
import { NavLink, useParams, Link , useSearchParams } from "react-router-dom";

const CharaterCard = ({ name, imgUrl, role }) => {

  return (
      <div className="h-[120px] p-[10px] w-[400px] border-[1px] border-white flex bg-gray-700">
        <div className="ml-[5px] w-[100px] h-[100px] rounded-[100px]">
          <img
            src={imgUrl}
            alt="home"
            className="border-[1px] bg-white w-[100px] h-[100px] rounded-[100px]"
          />
        </div>
        <div className=" ml-[20px] mt-[5px] flex flex-col gap-[22px]">
          <div className="text-[20px] w-[250px] h-auto font-mono">{name}</div>
          <div className="text-[15px] mb-[10px] text-gray-300">{role}</div>
        </div>
      </div>
  );
};

export default CharaterCard;
