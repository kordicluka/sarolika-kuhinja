import { ContactForm } from "@/components/contact/ContactForm";
import { PageTitle } from "@/components/PageTitle";
import React from "react";

export default function ContactUsPage() {
  return (
    <div className="page">
      <PageTitle
        title="Kontaktirajte nas."
        shortDesc="Možete nas kontaktirati ispunjavanjem formu ili putem kontakt informacija."
      />
      <ContactForm />
    </div>
  );
}
