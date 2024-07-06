"use client";
import "@/styles/DashboardHeaderDropdowns.scss";
import React, { useState } from "react";

export default function DashboardHeaderDropdowns() {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="dropdowns">
      <div className="dropdown">
        <button
          className="dropdown-button"
          onMouseEnter={() => setActiveDropdown(0)}
        >
          Jezik
        </button>
        <div
          className={
            activeDropdown === 0
              ? "dropdown-content active"
              : "dropdown-content"
          }
        >
          <button>Hrvatski</button>
        </div>
        <button
          className={activeDropdown === 0 ? "close active" : "close"}
          onMouseEnter={() => setActiveDropdown(null)}
        ></button>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-button"
          onMouseEnter={() => setActiveDropdown(1)}
        >
          Pomoć
        </button>
        <div
          className={
            activeDropdown === 1
              ? "dropdown-content active"
              : "dropdown-content"
          }
        >
          <a href="#">Kontakt</a>
          <a href="#">O nama</a>
          <a href="#">FAQ</a>
        </div>
        <button
          className={activeDropdown === 1 ? "close active" : "close"}
          onMouseEnter={() => setActiveDropdown(null)}
        ></button>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-button"
          onMouseEnter={() => setActiveDropdown(2)}
        >
          Upute za korištenje
        </button>
        <div
          className={
            activeDropdown === 2
              ? "dropdown-content active"
              : "dropdown-content"
          }
        >
          <a
            href="https://www.youtube.com/watch?v=2iwUAwxch94"
            target="_blank"
            rel="noreferrer"
          >
            Kako koristiti aplikaciju
          </a>
          <a
            href="https://www.youtube.com/watch?v=2iwUAwxch94"
            target="_blank"
            rel="noreferrer"
          >
            Kako dodati novu nekretninu
          </a>
          <a
            href="https://www.youtube.com/watch?v=2iwUAwxch94"
            target="_blank"
            rel="noreferrer"
          >
            Kako dodati novost
          </a>
        </div>
        <button
          className={activeDropdown === 2 ? "close active" : "close"}
          onMouseEnter={() => setActiveDropdown(null)}
        ></button>
      </div>
    </div>
  );
}
