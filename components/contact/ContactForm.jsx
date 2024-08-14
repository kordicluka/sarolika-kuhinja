'use client'
import React, { useState } from 'react'
import '@/styles/ContactForm.scss'
import { sendContactFormEmail } from '@/actions/ContactActions'
import Link from 'next/link'

export const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    const response = await sendContactFormEmail(data)

    if (response.ok) {
      alert(response.message)
      e.target.reset()
    } else {
      alert(response.message)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-col">
        <label htmlFor="name">Ime i prezime</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Josip Horvat"
        />
      </div>
      <div className="form-col">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="josip.horvat@domena.com"
        />
      </div>
      <div className="form-col">
        <label htmlFor="phone">Telefon</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="01 2345 678"
        />
      </div>
      <div className="form-col">
        <label htmlFor="message">Poruka</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Unesite poruku"
        ></textarea>
      </div>
      <div className="form-row">
        <input type="checkbox" id="terms" name="terms" required />
        <span>Slažem se sa uvjetima korištenja.</span>
      </div>
      <button type="submit">Pošalji</button>
      <div className="form-row">
        <span className="form-info">
          *Ove informacije mogu biti prepisane, korištene i pohranjene od strane
          trećih osoba stranke u skladu s našom
          <Link href="/politika-privatnosti">Politikom privatnosti</Link>.
        </span>
      </div>
    </form>
  )
}
