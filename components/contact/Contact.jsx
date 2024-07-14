import React from "react";
import { ContactForm } from "./ContactForm";
import "@/styles/Contact.scss";

export default function Contact() {
  return (
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
      </div>
      <ContactForm />
    </section>
  );
}
