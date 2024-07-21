import React from "react";
import NextImage from "next/image"; // Assuming you are using Next.js for image optimization
import "@/styles/MealsWeMake.scss";
import { Caveat } from "next/font/google";
import Link from "next/link";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export const MealsWeMake = () => {
  return (
    <section className="meals-we-make">
      <div className="salty-meals">
        {" "}
        <div className="rectangle"></div>
        <div className="text-container">
          <h3 className={caveat.className}>Salate, ostale slane stvari...</h3>
          <h2>
            Pogledajte kakva <span>slana jela</span> izrađujemo s djecom.
          </h2>
          <span className="desc">
            Na našim radionicama djeca će naučiti pripremati razna slana jela
            poput ukusnih salata, domaćih sendviča, mini pizze i raznih vrsta
            zdravih grickalica. <br />
            <br />
            Poseban naglasak stavljamo na korištenje svježih i nutritivno
            bogatih namirnica koje su ključne za zdrav razvoj djece. Djeca će
            tako usvojiti osnovne kulinarske vještine dok se zabavljaju i uče o
            važnosti uravnotežene prehrane.
          </span>
          <Link href="/jela" className="btn primary">
            <span>Istražite jela</span>
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
          </Link>
        </div>
        <div className="image-container">
          <NextImage
            src="/slana-jela.png"
            alt="Slana jela"
            width={1200}
            height={1200}
          />
        </div>
      </div>
      <div className="sweet-meals">
        <div className="rectangle"></div>

        <div className="image-container">
          <NextImage
            src="/slatka-jela.png"
            alt="Slatka jela"
            width={1200}
            height={1200}
          />
        </div>
        <div className="text-container">
          <h3 className={caveat.className}>Slatko je omiljeno djeci!</h3>
          <h2>
            Potičemo djecu da jela mogu biti slatka i <span> zdrava.</span>
          </h2>
          <span className="desc">
            Djeca obožavaju slatko, ali mi im pokazujemo kako slastice mogu biti
            i zdrave!
            <br />
            <br /> Na radionicama će naučiti pripremati razne zdrave deserte
            poput voćnih salata, domaćih granola pločica, smoothieja i kolača
            bez dodanog šećera.
            <br />
            <br /> Kroz ove aktivnosti djeca će razviti ljubav prema zdravim
            namirnicama i steći navike koje će ih pratiti cijeli život.
          </span>
          <Link href="/jela" className="btn primary">
            <span>Istražite jela</span>
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
          </Link>
        </div>
      </div>
    </section>
  );
};
