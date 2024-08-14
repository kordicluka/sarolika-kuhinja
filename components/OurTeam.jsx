import React from "react";
import { Caveat } from "next/font/google";
import NextImage from "next/image";
import "@/styles/OurTeam.scss";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export default function OurTeam() {
  return (
    <section className="our-team">
      <div className="our-team-text">
        <h3 className={caveat.className}>Naš tim</h3>
        <h2>Voditeljice programa</h2>
        <span className="our-team-description">
          Mi smo mladi tim koji čine dvije nutricionistice - Ema i Ana, i
          magistra ranog i predškolskog odgoja i obrazovanja - Dora.
          <br />
          <br />
          <strong>Ema i Ana</strong> su trenutno na diplomskom studiju
          nutricionizma, a Dora ima svoj obrt (@poligon.kids).
          <br /> <br />
          Sve tri imamo već nekoliko godina iskustva u radu s djecom i povezuje
          nas želja da djeci pomognemo stvoriti kvalitetne životne navike kroz
          igru i kuhanje. Uživamo raditi skupa i savršeno se nadopunjujemo.{" "}
          <br /> <br />
          Upravo je iz <strong> naše ljubavi prema radu s djecom</strong>{" "}
          nastala ideja o Šarolikoj kuhinji, mjestu gdje spajamo nutricionizam s
          odgojem i obrazovanjem djece.
          <br /> <br />
          <strong>Dora</strong> se brine za pedagoški pristup s naglaskom na
          principe pozitivne discipline, a Ema i Ana za upoznavanje sa zdravom
          prehranom na uravnotežen način.
          <br /> <br />
          Veselimo se upoznati Vašu djecu i kuhati s njima.
        </span>
      </div>
      <div className="our-team-image-container">
        <NextImage
          src="/images/our-team.png"
          alt="Naš tim"
          width={800}
          height={800}
        />
      </div>
    </section>
  );
}
