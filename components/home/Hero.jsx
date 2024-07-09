import React from "react";
import "@/styles/Hero.scss";
import NextImage from "next/image";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  display: "swap",
  weights: [400, 700],
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <section className="hero">
      <NextImage
        src="/images/hero.webp"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        className="hero-image"
      />
      <div className="hero-content">
        <h3 className={caveat.className}>Poticanje djece na zdravo!</h3>
        <h1>Radionice kuhanja za djecu.</h1>
        <div className="hero-content-location">
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <span>Kaptol Centar, Zagreb</span>
        </div>
        <p>
          U ovoj fazi djeca će aktivno sudjelovati u kuhanju jednostavnih jela.
        </p>
        <a href="/radionice" className="btn">
          Sve radionice
        </a>
      </div>
    </section>
  );
}
