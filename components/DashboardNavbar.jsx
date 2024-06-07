"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/DashboardNavbar.scss";
export default function DashboardNavbar() {
  const [activeLinkHover, setActiveLinkHover] = useState(3);
  const location = usePathname();

  const reactangleBackground = [
    { width: "4.2rem", left: "1.7rem" },
    { width: "6.4rem", left: "6rem" },
    { width: "3.8rem", left: "12.5rem" },
    { width: "5.4rem", left: "16.45rem" },
    { width: "3.9rem", left: "22rem" },
    { display: "none" },
  ];
  const getActiveIndex = (path) => {
    const thirdPart = path.split("/")[2];

    switch (thirdPart) {
      case "":
        return 0;
      case "radionice":
        return 1;
      case "blog":
        return 2;
      case "auth":
        return 3;
      case "jela":
        return 4;
      default:
        return 5;
    }
  };

  useEffect(() => {
    setActiveLinkHover(5);
  }, [location]);
  const activeIndex = getActiveIndex(location);

  return (
    <nav onMouseLeave={() => setActiveLinkHover(5)}>
      <div
        className="rectangle-background"
        style={reactangleBackground[activeIndex]}
      ></div>
      <div
        className="rectangle-background-active"
        style={reactangleBackground[activeLinkHover]}
      ></div>
      <a
        onMouseEnter={() => setActiveLinkHover(0)}
        href="/dashboard"
        className={activeIndex === 0 ? "active" : ""}
      >
        <span>Home</span>
      </a>
      <a
        onMouseEnter={() => setActiveLinkHover(1)}
        href="/dashboard/radionice"
        className={activeIndex === 1 ? "active" : ""}
      >
        <span>Radionice</span>
      </a>
      <a
        onMouseEnter={() => setActiveLinkHover(2)}
        href="/dashboard/blog"
        className={activeIndex === 2 ? "active" : ""}
      >
        <span>Blog</span>
      </a>
      <a
        onMouseEnter={() => setActiveLinkHover(3)}
        href="/dashboard/auth"
        className={activeIndex === 3 ? "active" : ""}
      >
        <span>Korisnici</span>
      </a>
      <a
        onMouseEnter={() => setActiveLinkHover(4)}
        href="/dashboard/jela"
        className={activeIndex === 4 ? "active" : ""}
      >
        <span>Jela</span>
      </a>
    </nav>
  );
}
