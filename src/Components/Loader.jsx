import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const Loader = () => {
  const ref = React.useRef();
  const scopeRef = React.useRef();
  useGSAP(
    () => {
      const splitText = SplitText.create(ref.current, {
        type: "chars",
      });

      gsap.fromTo(
        splitText.chars,
        {
          y: -200,
        },
        {
          y: 0,
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 1.2,
            from: "start",
          },
        }
      );
    },
    { scope: scopeRef, dependencies: [] }
  );
  return (
    <div className="h-screen flex justify-center items-center w-screen absolute z-5  text-4xl text-white">
      <div className="overflow-clip flex justify-center items-center h-80 w-80">
        <div
          ref={scopeRef}
          className="h-14 overflow-clip border-2 rounded-md shadow-[5px_5px_0_#000] flex justify-center items-center bg-white text-black font-semibold w-50"
        >
          <div ref={ref}>Loading...</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
