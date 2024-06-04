"use client";
import React, { useState } from "react";
import "@/styles/DashboardHeaderUser.scss";
import { signOut } from "next-auth/react";

function DashboardHeaderUser({ session }) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  return (
    <div
      className="user"
      onMouseEnter={() => setActiveDropdown(true)}
      onMouseLeave={() => setActiveDropdown(false)}
    >
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
      <div
        className={activeDropdown ? "user-dropdown active" : "user-dropdown"}
      >
        <a href="/dashboard/auth/profile-settings">Postavke</a>
        <button onClick={() => signOut()} className="logout">
          Odjavi se
        </button>
      </div>
    </div>
  );
}

export default DashboardHeaderUser;
