"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/DashboardNavbar.scss";
export default function DashboardNavbar() {
  const [activeLinkHover, setActiveLinkHover] = useState(3);
  const location = usePathname();

  return (
    <nav>
      <a href="/dashboard">
        <span>Home</span>
      </a>
      <a href="/dashboard/radionice">
        <span>Radionice</span>
      </a>
      <a href="/dashboard/blog">
        <span>Blog</span>
      </a>
      <a href="/dashboard/korisnici">
        <span>Korisnici</span>
      </a>

      <a href="/dashboard/jela">
        <span>Jela</span>
      </a>
      <a href="/dashboard/newsletter-korisnici">
        <span>Newsletter</span>
      </a>
      <a href="/dashboard/tipovi-sekcija">
        <span>Tipovi sekcija</span>
      </a>
    </nav>
  );
}
