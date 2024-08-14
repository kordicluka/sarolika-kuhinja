'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Facebook from './Facebook'
import Instagram from './Instagram'
import WhatsUpp from './WhatsUpp'
import '@/styles/Footer.scss'
import NextImage from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const pathName = usePathname()

  if (pathName.includes('/dashboard') || pathName.includes('/signin')) {
    return null
  } else {
    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-content-col">
            <Link href="/" className="logo">
              <NextImage
                src="/images/logo.png"
                alt="Logo"
                width={300}
                height={300}
              />
            </Link>
            <div className="socials">
              <Link
                className="social-container"
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook />
              </Link>
              <Link
                className="social-container"
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram />
              </Link>
              <Link
                className="social-container"
                href="https://www.whatsupp.com"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsUpp />
              </Link>
            </div>
          </div>
          <div className="footer-content-col">
            <h5>Menu</h5>
            <Link href="/" className="footer-link">
              Početna
            </Link>
            <Link href="/radionice" className="footer-link">
              Radionice
            </Link>
            <Link href="/blog" className="footer-link">
              Blog
            </Link>
            <Link href="/jela" className="footer-link">
              Jela
            </Link>
            <Link href="/o-nama" className="footer-link">
              O nama
            </Link>
            <Link href="/kontakt" className="footer-link">
              Kontakt
            </Link>
          </div>
          <div className="footer-content-col">
            <h5>Kontakt informacije</h5>
            <p>Adresa: Ulica i broj, Grad, Država</p>
            <p>Telefon: +123 456 789</p>
            <p>Email: info@primjer.com</p>
          </div>
          <div className="footer-content-col">
            <h5>Podrška</h5>
            <Link href="/faq" className="footer-link">
              Česta pitanja
            </Link>
            <Link href="/terms" className="footer-link">
              Uslovi korištenja
            </Link>
            <Link href="/privacy" className="footer-link">
              Privatnost
            </Link>
          </div>{' '}
          <div className="footer-content-col">
            <h5>Podrška</h5>
            <Link href="/faq" className="footer-link">
              Česta pitanja
            </Link>
            <Link href="/terms" className="footer-link">
              Uslovi korištenja
            </Link>
            <Link href="/privacy" className="footer-link">
              Privatnost
            </Link>
          </div>{' '}
        </div>
        <div className="footer-bottom">
          <div className="rights">© 2024. All rights reserved</div>
        </div>
      </footer>
    )
  }
}
