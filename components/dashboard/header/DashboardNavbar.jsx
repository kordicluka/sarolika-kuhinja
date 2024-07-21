"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "@/styles/DashboardNavbar.scss";
import Link from "next/link";

export default function DashboardNavbar() {
  const [activeLinkHover, setActiveLinkHover] = useState(3);
  const location = usePathname();

  return (
    <nav>
      <Link href="/dashboard">
        <span>Home</span>
      </Link>
      <Link href="/dashboard/radionice">
        <span>Radionice</span>
      </Link>
      <Link href="/dashboard/blog">
        <span>Blog</span>
      </Link>
      <Link href="/dashboard/korisnici">
        <span>Korisnici</span>
      </Link>

      <Link href="/dashboard/jela">
        <span>Jela</span>
      </Link>
      <Link href="/dashboard/newsletter-korisnici">
        <span>Newsletter</span>
      </Link>
      <Link href="/dashboard/tipovi-sekcija">
        <span>Tipovi sekcija</span>
      </Link>
    </nav>
  );
}
