import React from "react";
import "@/styles/Marquee.scss";

export default function Marquee({ textArray }) {
  return (
    <section className="marquee">
      <div className="marquee-inner">
        {textArray.map((text, index) => (
          <div key={index} className="marquee-item">
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}
