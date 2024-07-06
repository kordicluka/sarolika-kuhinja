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
      <div className="dashboard-page-navigation-right"> </div>
    </div>
  );
}
