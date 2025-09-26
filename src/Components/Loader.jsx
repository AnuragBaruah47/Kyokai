import React from "react";

const Loader = () => {
  return (
    <div
      className="h-[100vh] w-[100vw] flex justify-center items-center
     bg-[#1a1a1a] 
            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)]
    "
    >
      <div className="h-[60px] load w-[60px] border-[1px] border-black"></div>
    </div>
  );
};

export default Loader;
