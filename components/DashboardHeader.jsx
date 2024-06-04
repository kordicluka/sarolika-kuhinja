"use client";
import React, { useState, useEffect } from "react";
import "@/styles/Header.scss";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = usePathname();
  const [activeLinkHover, setActiveLinkHover] = useState(3);

  const borderBottom = [
    { width: "4.1rem", left: "2.3rem" },
    { width: "6.5rem", left: "7.8rem" },
    { width: "5rem", left: "15.5rem" },
  ];

  const reactangleBackground = [
    { width: "4.1rem", left: "2.3rem" },
    { width: "6.5rem", left: "7.8rem" },
    { width: "5rem", left: "15.5rem" },
    { display: "none" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const getActiveIndex = (path) => {
    switch (path) {
      case "/dashboard":
        return 0;
      case "/dashboard/radionice":
        return 1;
      case "/dashboard/blog":
        return 2;
      default:
        return 3;
    }
  };

  const activeIndex = getActiveIndex(location);

  useEffect(() => {
    setActiveLinkHover(3);
  }, [location]);

  return (
    <header>
      <section className="top-bar">
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
        <div className="time-and-made-by">
          <p className="time"></p>
          <div className="made-by">
            <p>Created by: </p>
            <a href="https://msk.hr/">msk.hr</a>
          </div>
        </div>
      </section>
      <section className="header">
        <div className="header-left">
          <div className="header-left-page-info">
            {" "}
            <h3>Šarolika Kuhinja</h3>
            <p>Admin aplikacija</p>
          </div>
          <div className="search">
            <input type="text" placeholder="Pretraži..." />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
        <div className="header-right">
          <div className="user">
            <div className="user-info">
              <div className="user-image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <p className="user-name">Ana Milanović</p>
              <p className="user-role">Admin</p>
            </div>
            <div className="user-dropdown"></div>
          </div>
        </div>
      </section>
      <nav onMouseLeave={() => setActiveLinkHover(3)}>
        <div
          className="border-bottom-line-active"
          style={borderBottom[activeIndex]}
        ></div>
        <div
          className="rectangle-background-active"
          style={reactangleBackground[activeLinkHover]}
        ></div>
        <a
          onMouseEnter={() => setActiveLinkHover(0)}
          href="/dashboard"
          className={activeLinkHover === 0 || activeIndex === 0 ? "active" : ""}
        >
          <span>Home</span>
        </a>
        <a
          onMouseEnter={() => setActiveLinkHover(1)}
          href="/dashboard/radionice"
          className={activeLinkHover === 1 || activeIndex === 1 ? "active" : ""}
        >
          <span>Nekretnine</span>
        </a>
        <a
          onMouseEnter={() => setActiveLinkHover(2)}
          href="/dashboard/blog"
          className={activeLinkHover === 2 || activeIndex === 2 ? "active" : ""}
        >
          <span>Novosti</span>
        </a>
      </nav>
    </header>
  );
};

export default DashboardHeader;
