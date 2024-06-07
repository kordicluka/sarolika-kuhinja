import React from "react";
import "@/styles/DashboardPageNavigation.scss";

export default function DashboardPageNavigation({ links }) {
  return (
    <div className="dashboard-page-navigation">
      <div className="dashboard-page-navigation-left">
        {links.map((link) => (
          <a
            href={link.href}
            key={link.href}
            className="dashboard-page-navigation-link"
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="dashboard-page-navigation-right">
        {" "}
        <div className="search">
          <input type="text" placeholder="Pretraži..." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
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
    </div>
  );
}
