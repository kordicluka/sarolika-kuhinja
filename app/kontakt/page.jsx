import Contact from "@/components/contact/Contact";
import { PageTitle } from "@/components/PageTitle";
import React from "react";

export default function ContactUsPage() {
  return (
    <div className="page contact-page">
      <PageTitle
        title="Kontaktirajte nas."
        shortDesc="Možete nas kontaktirati ispunjavanjem formu ili putem kontakt informacija."
      />
      <Contact />
    </div>
  );
}
