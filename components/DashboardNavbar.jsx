"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/DashboardNavbar.scss";
export default function DashboardNavbar() {
  const [activeLinkHover, setActiveLinkHover] = useState(3);
  const location = usePathname();
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
        <span>Radionice</span>
      </a>
      <a
        onMouseEnter={() => setActiveLinkHover(2)}
        href="/dashboard/blog"
        className={activeLinkHover === 2 || activeIndex === 2 ? "active" : ""}
      >
        <span>Novosti</span>
      </a>
    </nav>
  );
}
