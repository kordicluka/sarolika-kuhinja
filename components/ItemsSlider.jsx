"use client";
import React, { useRef } from "react";
import { Caveat } from "next/font/google";
import "@/styles/ItemsSlider.scss";
import ItemCard from "./items/ItemCard";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export const ItemsSlider = ({ type, items }) => {
  const containerRef = useRef();
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: containerRef.current.offsetWidth / items.length,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -containerRef.current.offsetWidth / (items.length - 1),
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="items-slider">
      <button className="arrow-button" onClick={scrollLeft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button className="arrow-button right-arrow-button" onClick={scrollRight}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
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
      <div className="items-container" ref={containerRef}>
        <div className="items-container-inner">
          {items?.length > 0 &&
            items.map((item) => (
              <ItemCard
                key={item.id} // Unique key assigned here
                item={item}
                link={`/${type === "workshops" ? "radionice" : "blog"}/${
                  item.slug
                }`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
