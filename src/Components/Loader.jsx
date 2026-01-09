import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loader = () => {
  const ref = React.useRef();
  const scopeRef=React.useRef()
  useGSAP(() => {
    gsap.to(ref.current, {
     rotate:360,
     duration:0.6,
     repeat:-1,
     ease:"sine.inOut",
     borderRadius:100,
     scale:1.5,
     repeatDelay:0.2
    });
  }, {scope:scopeRef, dependencies:[]});
  return (
    <div className="h-screen flex justify-center items-center w-screen absolute z-5 bg-black text-4xl text-white">
      <div ref={scopeRef} className="overflow-clip flex justify-center items-center h-80 w-80">
        <div ref={ref} className="h-20 w-20 border-4 border-white"></div>
      </div>
    </div>
  );
};

export default Loader;
