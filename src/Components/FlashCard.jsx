import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import CheckLoader from "./Tick";

const FlashCard = ({ message }) => {
  return (
    <div className="h-screen w-screen  flex justify-center items-center">
        <CheckLoader/>
    </div>
  );
};

export default FlashCard;
