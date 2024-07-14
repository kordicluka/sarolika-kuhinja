"use client";
import React from "react";
import { usePathname } from "next/navigation";
import "@/styles/Newsletter.scss";

export default function Newsletter() {
  const pathName = usePathname();

  if (pathName.includes("/dashboard") || pathName.includes("/signin")) {
    return null;
  } else {
    return (
      <section className="newsletter">
        <form className="newsletter-form">
          <h3>Prijavite se na naš Newsletter</h3>

          <p>
            Prijavite se na naš newsletter kako biste dobili najnovije vijesti i
            informacije o našim radionicama.
          </p>

          <div className="form-row">
            <div className="form-col">
              <label htmlFor="name">Ime*</label>
              <input
                className="small"
                type="name"
                placeholder="Unesite vaše ime"
              />
            </div>
            <div className="form-col">
              <label htmlFor="email">Email*</label>
              <input type="email" placeholder="Unesite vašu email adresu" />
            </div>{" "}
            <div className="form-col">
              <button className="btn" type="submit">
                Prijavi se
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}
