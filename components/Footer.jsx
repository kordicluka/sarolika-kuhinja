"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  if (pathName.includes("/dashboard") || pathName.includes("/signin")) {
    return null;
  } else {
    return <footer className="footer"></footer>;
  }
}
