"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Facebook from "./Facebook";
import Instagram from "./Instagram";
import WhatsUpp from "./WhatsUpp";
import "@/styles/Footer.scss";
import NextImage from "next/image";

export default function Footer() {
  const pathName = usePathname();

  if (pathName.includes("/dashboard") || pathName.includes("/signin")) {
    return null;
  } else {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-content-col">
            <a href="/" className="logo">
              <NextImage
                src="/images/logo.png"
                alt="Logo"
                width={300}
                height={300}
              />
            </a>
            <div className="socials">
              <a
                className="social-container"
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook />
              </a>
              <a
                className="social-container"
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
              </a>
              <a
                className="social-container"
                href="https://www.whatsupp.com"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsUpp />
              </a>
            </div>
          </div>
          <div className="footer-content-col">
            <h5>Menu</h5>
            <a href="/" className="footer-link">
              Početna
            </a>
            <a href="/radionice" className="footer-link">
              Radionice
            </a>
            <a href="/blog" className="footer-link">
              Blog
            </a>
            <a href="/jela" className="footer-link">
              Jela
            </a>
            <a href="/o-nama" className="footer-link">
              O nama
            </a>
            <a href="/kontakt" className="footer-link">
              Kontakt
            </a>
          </div>
          <div className="footer-content-col">
            <h5>Kontakt informacije</h5>
            <p>Adresa: Ulica i broj, Grad, Država</p>
            <p>Telefon: +123 456 789</p>
            <p>Email: info@primjer.com</p>
          </div>
          <div className="footer-content-col">
            <h5>Podrška</h5>
            <a href="/faq" className="footer-link">
              Česta pitanja
            </a>
            <a href="/terms" className="footer-link">
              Uslovi korištenja
            </a>
            <a href="/privacy" className="footer-link">
              Privatnost
            </a>
          </div>{" "}
          <div className="footer-content-col">
            <h5>Podrška</h5>
            <a href="/faq" className="footer-link">
              Česta pitanja
            </a>
            <a href="/terms" className="footer-link">
              Uslovi korištenja
            </a>
            <a href="/privacy" className="footer-link">
              Privatnost
            </a>
          </div>{" "}
        </div>
        <div className="footer-bottom">
          <div className="rights">© 2024. All rights reserved</div>
        </div>
      </footer>
    );
  }
}
