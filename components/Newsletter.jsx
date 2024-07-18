"use client";
import React from "react";
import { usePathname } from "next/navigation";
import "@/styles/Newsletter.scss";
import { Inter } from "next/font/google";
import NextImage from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

export default function Newsletter() {
  const pathName = usePathname();

  if (pathName.includes("/dashboard") || pathName.includes("/signin")) {
    return null;
  } else {
    return (
      <section className="newsletter">
        <form className={inter.className}>
          <h2>
            Prijavite se na naš <span>Newsletter </span>
          </h2>
          <p>
            Prijavite se na naš newsletter kako biste dobili najnovije vijesti i
            informacije o našim radionicama.
          </p>
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
          <div className="form-row">
            <input type="checkbox" id="terms" name="terms" />
            <label htmlFor="terms">Pristajem na uvjete korištenja</label>
          </div>
          <div className="form-row">
            <div className="form-col">
              <button className="btn" type="submit">
                <span className={inter.className}>Pošalji</span>
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
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="image-container">
          {/* /images/newsletter.webp */}
          <NextImage
            src="/images/newsletter.webp"
            alt="Newsletter"
            width={1500}
            height={1500}
          />
        </div>
      </section>
    );
  }
}
