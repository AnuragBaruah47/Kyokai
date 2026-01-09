import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const AnimeCard = ({ imageUrl, title, type, status, ratings, popularity }) => {
  const rotateRef = useRef();
  const targetRef = useRef();

  const onHoverEnter = () => {
    gsap.to(rotateRef.current, {
      x: 340,
      ease: "power3.in",
    });
  };

  const onHoverExit = () => {
    gsap.to(rotateRef.current, {
      x: 0,
      ease: "power3.out",
    });
  };

  return (
    <div
      onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverExit}
      className="h-98 overflow-clip bg-contain cursor-pointer bg-center items-center flex justify-center bg-no-repeat border-2 shadow-[5px_5px_0_#000] bg-white w-xs"
    >
      <div className="mx-4 font-semibold relative bottom-20 flex mt-30 flex-col gap-2 text-xl">
        <h1>{title}</h1>
        <h1>{type}</h1>
        <h1>{status}</h1>
        <h1>{ratings}</h1>
        <h1>{popularity}</h1>
      </div>
      <img
        ref={rotateRef}
        src={imageUrl}
        className="absolute h-[362px] w-[290px]"
        alt=""
      />
    </div>
  );
};
export default AnimeCard;
