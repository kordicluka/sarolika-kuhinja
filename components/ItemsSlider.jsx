import React from "react";
import { Caveat } from "next/font/google";
import "@/styles/ItemsSlider.scss";

const caveat = Caveat({
  display: "swap",
  weights: [400, 700],
  subsets: ["latin"],
});

export const ItemsSlider = ({ type }) => {
  return (
    <section className="items-slider">
      <div className="items-slider-title">
        <div className="items-slider-title-left">
          <h3 className={caveat.className}>
            {type === "workshops"
              ? "Kliknite na radionicu kako bi saznali više"
              : "Zanimljive objave o nutricionizmu"}
          </h3>
          <h2>
            {" "}
            {type === "workshops"
              ? "Sljedeće i prethodne radionice"
              : "Pogledajte naš blog"}{" "}
          </h2>
        </div>
        <div className="items-slider-title-right">
          <a href="/radionice" className="btn primary">
            <span>Sve radionice</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="items-container">
        <div className="items-container-inner"></div>
      </div>
    </section>
  );
};
