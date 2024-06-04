import React from "react";
import "@/styles/DashboardHeader.scss";
import DashboardNavbar from "./DashboardNavbar";
import DashboardHeaderDropdowns from "./DashboardHeaderDropdowns";

const DashboardHeader = () => {
  return (
    <header>
      <section className="top-bar">
        <DashboardHeaderDropdowns />
        <div className="time-and-made-by">
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
      <DashboardNavbar />
    </header>
  );
};

export default DashboardHeader;
