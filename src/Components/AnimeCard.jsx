import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "../Utils";

const AnimeCard = ({ imageUrl, title, type, status, ratings, popularity,className,classNamePhoto }) => {
  const rotateRef = useRef();
  const targetRef = useRef();

  const onHoverEnter = () => {
    gsap.to(rotateRef.current, {
      rotateY: -91,
      ease: "power3.in",
      transformOrigin: "left",
    });
  };

  const onHoverExit = () => {
    gsap.to(rotateRef.current, {
      rotateY: 0,
      ease: "power3.out",
    });
  };

  return (
    <div
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverExit}
      className={cn("h-92 overflow-clip bg-contain cursor-pointer bg-center items-center flex justify-center bg-no-repeat border-2 shadow-[5px_5px_0_#000] bg-white w-[280px]",className)}
    >
      <div className="h-98">
        <div className={"w-[250px] p-2 h-80 font-semibold border-2 tracking-tight justify-center relative bottom-20 flex mt-30 flex-col gap-2.5 text-xl"}>
          <i>{title}</i>
          <i>{type}</i>
          <i>{status}</i>
          <i>{ratings}</i>
          <i>{popularity}</i>
        </div>
      </div>
      <img
        ref={rotateRef}
        src={imageUrl}
        className={cn("absolute h-92 w-[280px]",classNamePhoto)}
        alt=""
      />
    </div>
  );
};
export default AnimeCard;
