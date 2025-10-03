import React from "react";
import { first1800Chars, formatToLocaleDate } from "../utill";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

const ReviewCard = ({ response }) => {
  const [more, setMore] = useState(false);

  const setValueOfMore = () => setMore((prev) => !prev);



  return (
    <div className="bg-black">
      <div className=" bg-gray-700 border-[1px] flex flex-col border-white h-auto w-full  ">
        <h1 className="pl-[10px] flex justify-center font-sans text-white font-[900]">
          {formatToLocaleDate(response?.date)}
        </h1>
        <div className="pl-[10px] rounded-[5px] pr-[10px]  text-white font-[600] font-sans w-full h-auto">
          {more === false ? first1800Chars(response?.review) : response.review} 
          <button onClick={setValueOfMore} className="hover:cursor-pointer">
            {more === false ? (
              <h1 className="font-sans">Read More</h1>
            ) : (
              <h1 className="font-sans">Show Less</h1>
            )}
          </button>
        </div>
        <div className="ml-[10px]">
          <div>
            <div className="flex text-[18px] mb-[10px] text-white font-[500] font-sans">
              Ratings :
              <div className="h-auto flex text-white  justify-center">
                <FaStar className="ml-[10px]  mr-[2px] text-yellow-300 text-2xl" />
                {response?.score}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
