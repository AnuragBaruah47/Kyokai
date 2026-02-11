import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CheckLoader({ done }) {
  const circleRef = useRef(null);
  const checkRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const check = checkRef.current;

    const circleLength = circle.getTotalLength();
    const checkLength = check.getTotalLength();

    // Prep SVG strokes
    gsap.set(circle, {
      strokeDasharray: circleLength,
      strokeDashoffset: circleLength,
    });

    gsap.set(check, {
      strokeDasharray: checkLength,
      strokeDashoffset: checkLength,
      opacity: 0,
    });

    // Loader loop
    tlRef.current = gsap
      .timeline({ repeat: -1 })
      .to(circle, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "linear",
      })
      .to(circle, {
        strokeDashoffset: -circleLength,
        duration: 1.2,
        ease: "linear",
      });

    return () => tlRef.current?.kill();
  }, []);

  useEffect(() => {
    if (!done) return;

    // Stop loader
    tlRef.current.kill();

    const circle = circleRef.current;
    const check = checkRef.current;

    gsap
      .timeline()
      .to(circle, {
        strokeDashoffset: 0,
        stroke: "#22c55e",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        check,
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.1",
      );
  }, [done]);

  return (
    <svg viewBox="0 0 24 24" width="96" height="96" fill="none">
      <circle
        ref={circleRef}
        cx="12"
        cy="12"
        r="10"
        stroke="#1C274C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        ref={checkRef}
        d="M8.5 12.5L10.5 14.5L15.5 9.5"
        stroke="#22c55e"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
