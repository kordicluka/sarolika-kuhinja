"use client";
import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { Inter } from "next/font/google";
import "@/styles/NewsletterPopUp.scss";

const inter = Inter({
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
});

export default function NewsletterPopUp() {
  const [active, setActive] = useState(false);

  // get from the local storage
  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed");
    // make this down bellow but add a timeout
    // if (!isSubscribed) {
    //   setActive(true);
    // }

    setTimeout(() => {
      if (!isSubscribed) {
        setActive(true);
      }
    }, 1);
  }, []);

  return (
    <section className={`newsletter-popup ${active ? "active" : ""}`}>
      <form className={inter.className}>
        <button
          className="close"
          onClick={() => {
            setActive(false);
            localStorage.setItem("isSubscribed", true);
          }}
          type="button"
        >
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h4>Prijavite se na naš newsletter</h4>
        <NextImage
          src="/images/newsletter-pop-up.jpg"
          width={400}
          height={400}
          alt="Newsletter popup"
          className="newsletter-popup-image"
        />{" "}
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="name">Ime*</label>
            <input className="small" type="name" placeholder="Josip Horvat" />
          </div>
          <div className="form-col">
            <label htmlFor="email">Email*</label>
            <input type="email" placeholder="josip.horvat@domena.com" />
          </div>{" "}
        </div>{" "}
        <div className="form-row terms-checkbox">
          <input type="checkbox" id="terms" name="terms" />
          <label htmlFor="terms">Pristajem na uvjete korištenja</label>
        </div>
        <div className="form-row ">
          <div className="form-col">
            <button className="btn" type="submit">
              <span className={inter.className}>Pošalji prijavu </span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
