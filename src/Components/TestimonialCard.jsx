import React from "react";
import { first300Chars } from "../utill";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({response,score}) => {

  return (
    <div className=" bg-gray-700 border-[1px] flex flex-col border-white h-[180px] w-[450px]  ">
    <div className="pl-[10px] rounded-[5px] pr-[10px]  text-white font-[600] font-sans  w-[450px] h-auto overflow-clip flex justify-center">
      {first300Chars(response)}
    </div>
       <div className="ml-[10px]">
              <div>
                <div className="flex text-[18px] font-[500] font-sans">
                  Ratings :
                  <div className="h-auto flex justify-center">
                    <FaStar className="ml-[10px] mr-[2px] text-yellow-300 text-2xl" />
                    {score}
                  </div>
                </div>
              </div>
            </div>
    </div>
  );
};

export default TestimonialCard;
