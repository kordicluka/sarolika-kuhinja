import React from "react";
import "@/styles/ContactForm.scss";

export const ContactForm = () => {
  return (
    <form className="contact-form">
      <div className="form-col">
        <label htmlFor="name">Ime i prezime</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-col">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-col">
        <label htmlFor="phone">Telefon</label>
        <input type="tel" id="phone" name="phone" required />
      </div>
      <div className="form-col">
        <label htmlFor="message">Poruka</label>
        <textarea id="message" name="message" required></textarea>
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
          <a href="/politika-privatnosti">Politikom privatnosti</a>.
        </span>
      </div>
    </form>
  );
};
