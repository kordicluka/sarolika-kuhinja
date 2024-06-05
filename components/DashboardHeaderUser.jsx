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
          {session.user.image === null ? (
            <span>
              {session.user.name.charAt(0).toUpperCase()}
              {session.user.name.split(" ")[1]
                ? session.user.name.split(" ")[1].charAt(0).toUpperCase()
                : null}
            </span>
          ) : (
            <img src={session.user.image} alt={session.user.name} />
          )}
        </div>
        <p className="user-name">{session.user.name}</p>
        <p className="user-role"> {session.user.role} </p>
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
