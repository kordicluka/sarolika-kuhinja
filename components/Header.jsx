'use client'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NextImage from 'next/image'
import '@/styles/Header.scss'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'
import { Search } from './Search'
import { Caveat } from 'next/font/google'
import { getNextWorkshop } from '@/actions/WorkshopsActions'
import Link from 'next/link'
import Facebook from './Facebook'
import Instagram from './Instagram'
import WhatsUpp from './WhatsUpp'

const caveat = Caveat({
  weights: [400, 500, 600, 700],
  subsets: ['latin'],
})

export const Header = () => {
  const pathName = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [nextWorkshop, setNextWorkshop] = useState(null)
  const [timeDiff, setTimeDiff] = useState(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const fetchNextWorkshop = async () => {
      const response = await getNextWorkshop()
      if (response.ok) {
        setNextWorkshop(response.workshop)
        setTimeDiff(new Date(response.workshop.date) - new Date())
      }
    }

    fetchNextWorkshop()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getDaysToNextWorkshop = () => {
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24))
  }

  const getHoursToNextWorkshop = () => {
    return Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  }

  const getMinutesToNextWorkshop = () => {
    return Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  }

  const getTensOf = (number) => {
    return Math.floor(number / 10)
  }

  const getUnitsOf = (number) => {
    return number % 10
  }

  const onChangeSearch = (event) => {
    console.log(event.target.value)
  }

  if (pathName.includes('/dashboard') || pathName.includes('/signin')) {
    return null
  } else {
    return (
      <header className={isScrolled ? 'header scrolled' : 'header'}>
        {nextWorkshop && (
          <Link
            className={isScrolled ? 'next-workshop hide' : 'next-workshop '}
            href={`/radionice/${nextWorkshop.slug}`}
          >
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
              <div className="next-workshop-time-to-label">h</div>
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
              {nextWorkshop.title + ': '}
            </span>
            <span className="next-workshop-date-and-time">
              {formatDate(nextWorkshop.date)} u {formatTime(nextWorkshop.date)}{' '}
              h
            </span>
          </Link>
        )}
        <nav className="header-nav">
          <div className="header-nav-left">
            {' '}
            <Link className="header-logo" href="/">
              <NextImage
                src="/images/logo.png"
                alt="Logo"
                width={400}
                height={400}
              />
            </Link>
            <ul className="links">
              <li>
                <Link href="/">Početna</Link>
              </li>
              <li>
                <Link href="/radionice">Radionice</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/jela">Jela</Link>
              </li>
              <li>
                <Link href="/o-nama">O nama</Link>
              </li>
            </ul>{' '}
            {/* <Search onChange={onChangeSearch} /> */}
          </div>
          <div className="header-nav-right">
            {' '}
            <div className="contact-info-left">
              <Link
                className="contact-info-left-item"
                href="tel:+385912345678"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span>+385 91 2345 678</span>
              </Link>
              <Link
                className="contact-info-left-item"
                href="mailto:info@sarolika-kuhinja.com"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>

                <span> info@sarolika-kuhinja.com</span>
              </Link>
            </div>
            <button
              onClick={() => setMobileMenu(true)}
              className="mobile-menu-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
            <Link className="btn primary" href="/kontakt">
              Kontakt
            </Link>{' '}
          </div>
        </nav>
        <nav
          className="header-mobile-menu"
          style={{ display: mobileMenu ? 'flex' : 'none' }}
        >
          <button
            className="close"
            onClick={() => setMobileMenu(false)}
          ></button>

          <Link className="logo" href="/" onClick={() => setMobileMenu(false)}>
            <NextImage
              src="/images/logo.png"
              alt="Logo"
              width={400}
              height={400}
            />{' '}
          </Link>

          <div className="links">
            <Link href="/" onClick={() => setMobileMenu(false)}>
              <span>Početna</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="/radionice" onClick={() => setMobileMenu(false)}>
              <span>Radionice</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="/blog" onClick={() => setMobileMenu(false)}>
              <span>Blog</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="/jela" onClick={() => setMobileMenu(false)}>
              <span>Jela</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="/o-nama" onClick={() => setMobileMenu(false)}>
              <span>O nama</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            <Link href="/kontakt" onClick={() => setMobileMenu(false)}>
              <span>Kontakt</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </nav>
      </header>
    )
  }
}
