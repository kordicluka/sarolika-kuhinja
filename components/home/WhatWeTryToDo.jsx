import React from "react";
import "@/styles/WhatWeTryToDo.scss";
import { Caveat } from "next/font/google";
import NextImage from "next/image";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export default function WhatWeTryToDo() {
  return (
    <section className="what-we-try-to-do">
      {" "}
      <div className="what-we-try-to-do-title">
        <h3 className={caveat.className}>Što donosimo djeci</h3>
        <h2>Djecu učimo kroz igru</h2>
      </div>
      <div className="what-we-try-to-do-container">
        <div className="what-we-try-to-do-image">
          <NextImage
            src={"/images/our-team.png"}
            alt="Our team"
            width={1500}
            height={1500}
          />
        </div>
        <div className="what-we-try-to-do-content">
          <h6>
            Šarolika kuhinja je mjesto gdje djeca uče kroz igru, zabavu i
            kreativno izražavanje.
          </h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            molestiae vero possimus error distinctio nulla eos nostrum qui nihil
            atque. Excepturi eaque repudiandae sit totam ab blanditiis aliquam
            commodi odio, quidem, fugit optio ullam nulla.
          </p>
          <ul className="what-we-try-to-do-content-list">
            <li className="what-we-try-to-do-content-item">
              <div className="what-we-try-to-do-content-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
              </div>
              <div className="what-we-try-to-do-content-item-text">
                <h6>Učenje</h6>
                <p>
                  Djeca će učiti o različitim kulturama, zemljama, povijesti i
                  mnogim drugim temama.
                </p>
              </div>
            </li>
            <li className="what-we-try-to-do-content-item">
              <div className="what-we-try-to-do-content-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
              </div>
              <div className="what-we-try-to-do-content-item-text">
                <h6>Zabava</h6>
                <p>
                  Djeca će učiti o različitim kulturama, zemljama, povijesti i
                  mnogim drugim temama.
                </p>
              </div>
            </li>
            <li className="what-we-try-to-do-content-item">
              <div className="what-we-try-to-do-content-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
                  />
                </svg>
              </div>
              <div className="what-we-try-to-do-content-item-text">
                <h6>Kreativno izražavanje</h6>
                <p>
                  Djeca će učiti o različitim kulturama, zemljama, povijesti i
                  mnogim drugim temama.
                </p>
              </div>
            </li>
            <li className="what-we-try-to-do-content-item">
              <div className="what-we-try-to-do-content-item-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>
              </div>
              <div className="what-we-try-to-do-content-item-text">
                <h6>Zdrava prehrana</h6>
                <p>
                  Djeca će učiti o različitim kulturama, zemljama, povijesti i
                  mnogim drugim temama.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
