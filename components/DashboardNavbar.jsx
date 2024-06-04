"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/DashboardNavbar.scss";
export default function DashboardNavbar() {
  const [activeLinkHover, setActiveLinkHover] = useState(3);
  const location = usePathname();

  const reactangleBackground = [
    { width: "4.2rem", left: "1.7rem" },
    { width: "6.5rem", left: "6rem" },
    { width: "3.8rem", left: "12.5rem" },
    { display: "none" },
  ];
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

  useEffect(() => {
    setActiveLinkHover(3);
  }, [location]);
  const activeIndex = getActiveIndex(location);

  return (
    <nav onMouseLeave={() => setActiveLinkHover(3)}>
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
    </nav>
  );
}
