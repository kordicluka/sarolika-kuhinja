"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NextImage from "next/image";
import "@/styles/Header.scss";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { Search } from "./Search";
import { Caveat } from "next/font/google";
import Facebook from "@/components/Facebook";
import Instagram from "@/components/Instagram";
import WhatsUpp from "@/components/WhatsUpp";
import { getNextWorkshop } from "@/actions/WorkshopsActions";

const caveat = Caveat({
  weights: [400, 700],
  subsets: ["latin"],
});

export const Header = () => {
  const pathName = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [nextWorkshop, setNextWorkshop] = useState(null);
  const [timeDiff, setTimeDiff] = useState(null);

  useEffect(() => {
    const fetchNextWorkshop = async () => {
      const response = await getNextWorkshop();
      if (response.ok) {
        setNextWorkshop(response.workshop);
        setTimeDiff(new Date(response.workshop.date) - new Date());
      }
    };

    fetchNextWorkshop();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getDaysToNextWorkshop = () => {
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };

  const getHoursToNextWorkshop = () => {
    return Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  };

  const getMinutesToNextWorkshop = () => {
    return Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  };

  const getTensOf = (number) => {
    return Math.floor(number / 10);
  };

  const getUnitsOf = (number) => {
    return number % 10;
  };

  const onChangeSearch = (event) => {
    console.log(event.target.value);
  };

  if (pathName.includes("/dashboard") || pathName.includes("/signin")) {
    return null;
  } else {
    return (
      <header className="header">
        <div className={`contact-info ${isScrolled ? "hide" : ""}`}>
          <div className="contact-info-left">
            <a
              className="contact-info-left-item"
              href="tel:+385912345678"
              target="_blank"
              rel="noreferrer"
            >
              Tel: +385 91 2345 678
            </a>
            <a
              className="contact-info-left-item"
              href="mailto:info@sarolika-kuhinja.com"
              target="_blank"
              rel="noreferrer"
            >
              E-mail: info@sarolika-kuhinja.com
            </a>
          </div>
          <div className="contact-info-right contact-info-socials">
            <a
              className="social-container"
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook color="#405b62" />
            </a>
            <a
              className="social-container"
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <Instagram color="#405b62" />
            </a>
            <a
              className="social-container"
              href="https://www.whatsupp.com"
              target="_blank"
              rel="noreferrer"
            >
              <WhatsUpp color="#405b62" />
            </a>
          </div>
        </div>
        <nav className="header-nav">
          <div className="header-logo">
            <NextImage
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="header-nav-left">
            <ul className="links">
              <li>
                <a href="/">Početna</a>
              </li>
              <li>
                <a href="/radionice">Radionice</a>
              </li>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/jela">Jela</a>
              </li>
              <li>
                <a href="/o-nama">O nama</a>
              </li>
            </ul>
          </div>
          <div className="header-nav-right">
            <Search onChange={onChangeSearch} />
            <a className="btn primary" href="/kontakt">
              Kontakt
            </a>
          </div>
        </nav>

        {nextWorkshop && (
          <a className="next-workshop" href={`/radionice/${nextWorkshop.slug}`}>
            <p className={caveat.className}>Sljedeća radionica:</p>
            <div className="next-workshop-time-to-container">
              <div className="next-workshop-time-to">
                <div className="units">
                  {getTensOf(getDaysToNextWorkshop())}
                </div>
                <div className="units">
                  {getUnitsOf(getDaysToNextWorkshop())}
                </div>
              </div>
              <div className="next-workshop-time-to-label">dana</div>
            </div>

            <div className="next-workshop-time-to-container">
              <div className="next-workshop-time-to">
                <div className="units">
                  {getTensOf(getHoursToNextWorkshop())}
                </div>
                <div className="units">
                  {getUnitsOf(getHoursToNextWorkshop())}
                </div>
              </div>
              <div className="next-workshop-time-to-label">sati</div>
            </div>

            <div className="next-workshop-time-to-container">
              <div className="next-workshop-time-to">
                <div className="units">
                  {getTensOf(getMinutesToNextWorkshop())}
                </div>
                <div className="units">
                  {getUnitsOf(getMinutesToNextWorkshop())}
                </div>
              </div>
              <div className="next-workshop-time-to-label">minuta</div>
            </div>

            <span className="next-workshop-title">
              {nextWorkshop.title + ": "}
            </span>
            <span className="next-workshop-date-and-time">
              {formatDate(nextWorkshop.date)} u {formatTime(nextWorkshop.date)}{" "}
              sati
            </span>
          </a>
        )}
      </header>
    );
  }
};
