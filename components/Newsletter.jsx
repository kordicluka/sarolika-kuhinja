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
          <h6>Prijavite se na naš</h6>
          <h3>Newsletter</h3>

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
