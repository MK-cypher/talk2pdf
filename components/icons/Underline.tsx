"use client";
import React, {useEffect, useState} from "react";

export default function Underline() {
  const [width, setWidth] = useState(300);

  const resize = () => {
    setWidth(window.innerWidth < 290 ? window.innerWidth - 10 : 300);
  };

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <svg id="eVb23CZo4JK1" width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 30">
      <path
        d="M58.981466,150c41.834945-15.85099,119.427123-15.281452,155.437483,0"
        transform="matrix(1.930036 0 0 1.424606-112.609164-195.025478)"
        fill="none"
        stroke="#df2e14"
      />
      <path
        d="M216.875246,142.158327c-29.718653-8.682961-49.743714.269-59.437305,7.346485"
        transform="translate(84.351912-123.121812)"
        fill="none"
        stroke="#df2e14"
        strokeWidth="1.5"
      />
    </svg>
  );
}
