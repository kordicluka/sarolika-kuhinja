import React from "react";
import MapContainer from "./MapContainer";
import "@/styles/Location.scss";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export default function Location() {
  // let apiKey = "AIzaSyDe07jdWY3XT3XlacF0OUOJyKY0SbaHt4I";

  return (
    <section className="location">
      {" "}
      <div className="rectangle-right"></div>
      <div className="location-title">
        <h3 className={caveat.className}> Gdje se nalazimo?</h3>
        <h2>Naša lokacija</h2>
        <p>
          Ulica: Nova Ves 17, Kaptol Centar 10 000 Zagreb <br />
        </p>
      </div>
      <div className="location-container">
        <MapContainer />
        <div className="location-video-container"></div>{" "}
        <video
          src="/images/kako-do-nas.mp4"
          loop
          controls
          className="location-video"
        ></video>
      </div>{" "}
    </section>
  );
}
