"use client";
import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import { Inter } from "next/font/google";
import "@/styles/NewsletterPopUp.scss";
import { createNewsletterUser } from "@/actions/NewsletterUsersActions";

const inter = Inter({
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  subsets: ["latin"],
});

export default function NewsletterPopUp() {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    terms: false,
  });

  useEffect(() => {
    const isSubscribed = localStorage.getItem("isSubscribed");

    setTimeout(() => {
      if (!isSubscribed) {
        setActive(true);
      }
    }, 5000); // Adjust the timeout duration as needed
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, terms } = formData;

    if (!terms) {
      alert("Morate pristati na uvjete korištenja.");
      return;
    }

    try {
      const response = await createNewsletterUser({ name, email });
      if (response.ok) {
        alert(response.message);
        setFormData({ name: "", email: "", terms: false });
        localStorage.setItem("isSubscribed", true);
        setActive(false);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className={`newsletter-popup ${active ? "active" : ""}`}>
      <form className={inter.className} onSubmit={handleSubmit}>
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
        />
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="name">Ime*</label>
            <input
              className="small"
              type="text"
              name="name"
              placeholder="Josip"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-col">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              placeholder="josip.horvat@domena.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row terms-checkbox">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">Pristajem na uvjete korištenja</label>
        </div>
        <div className="form-row">
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
