import React from 'react'
import { ContactForm } from './ContactForm'
import '@/styles/Contact.scss'
import Location from '@/components/Location'
import Instagram from '../Instagram'
import Facebook from '../Facebook'
import WhatsUpp from '../WhatsUpp'
import Link from 'next/link'

export default function Contact() {
  return (
    <>
      <section className="contact-container">
        <div className="contact-info">
          <h3>Naše informacije</h3>
          <p>
            Za sve upite, informacije i rezervacije slobodno nas kontaktirajte
            putem kontakt forme ili na navedene kontakt informacije.
          </p>
          <div className="contact-row">
            <span>Adresa:</span>
            <span>Ulica 123, 10000 Zagreb</span>
          </div>
          <div className="contact-row">
            <span>Telefon:</span>
            <span>01 2345 678</span>
          </div>
          <div className="contact-row">
            <span>Email:</span>
            <span>luka.kordic@msk.hr</span>
          </div>
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
        <ContactForm />
      </section>{' '}
      <Location />
    </>
  )
}
