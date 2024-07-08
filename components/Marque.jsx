import React from "react";
import "@/styles/Marquee.scss";
import Marquee from "react-fast-marquee";

export default function Marque({ textArray }) {
  return (
    <Marquee
      gradient={false}
      speed={100}
      pauseOnHover={true}
      className="marquee"
    >
      {textArray.map((text, index) => (
        <div key={index} className="marquee-item">
          <div className="circle"></div>
          <span>{text}</span>
        </div>
      ))}
    </Marquee>
  );
}
