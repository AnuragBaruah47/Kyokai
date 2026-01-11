import React from "react";
import { TrunNameChars } from "../Utils";

const CharacterCard = ({ images, name }) => {
  return (
    <div className="bg-white flex gap-4 items-center border-2 shadow-[5px_5px_0_#000] text-2xl font-semibold">
      <div>
        {images && (
          <img
            src={images}
            className="h-30 w-30  border-2 shadow-[5px_5px_0_#000]"
            alt=""
          />
        )}
      </div>

      <div>{name ? <h1>{TrunNameChars(name)}</h1> : <h1>Unknown</h1>}</div>
    </div>
  );
};

export default CharacterCard;
