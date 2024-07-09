import React from "react";
import "@/styles/Marquee.scss";
import Marquee from "react-fast-marquee";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  display: "swap",
  weights: [400, 700],
  subsets: ["latin"],
});

export default function Marque({ textArray }) {
  return (
    <Marquee gradient={false} speed={100} className="marquee">
      {textArray.map((text, index) => (
        <div key={index} className="marquee-item">
          <div className="circle"></div>
          <span className={caveat.className}>{text}</span>
        </div>
      ))}
    </Marquee>
  );
}
