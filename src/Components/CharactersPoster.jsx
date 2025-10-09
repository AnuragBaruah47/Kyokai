import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const CharactersPoster = ({ img, name, role, Mainvalue }) => {

  return (
    <NavLink to={`/character?keyword=${Mainvalue}`}>
      <div>
        <div className="flex flex-col h-[350px] border-[2px] border-white bg-white w-[230px] hover:cursor-pointer">
          <img src={img} alt="home" className="h-[300px] w-[230px]" />
          <div className="ml-[5px] mr-[5px]">
            <div className="font-mono h-[20px] flex w-[230px] overflow-clip text-[16px] font-[900]">
              Name: <div>{name}</div>
            </div>
            <div className="font-mono mt-[1px] text-[16px] font-[900]">
              role: {role}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CharactersPoster;
