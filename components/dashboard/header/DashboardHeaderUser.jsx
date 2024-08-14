"use client";
import React, { useState } from "react";
import "@/styles/DashboardHeaderUser.scss";
import { signOut } from "next-auth/react";
import NextImage from "next/image";
import Link from "next/link";

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
          {session.user.image === null || session.user.image === "" ? (
            <span>
              {session.user.name.charAt(0).toUpperCase()}
              {session.user.name.split(" ")[1]
                ? session.user.name.split(" ")[1].charAt(0).toUpperCase()
                : null}
            </span>
          ) : (
            <NextImage
              src={session.user.image}
              alt="User image"
              width={40}
              height={40}
            />
          )}
        </div>
        <p className="user-name">{session.user.name}</p>
        <p className="user-role"> {session.user.role} </p>
      </div>
      <div
        className={activeDropdown ? "user-dropdown active" : "user-dropdown"}
      >
        <Link href="/dashboard/auth/profile-settings">Postavke</Link>
        <button onClick={() => signOut()} className="logout">
          Odjavi se
        </button>
      </div>
    </div>
  );
}

export default DashboardHeaderUser;
