import Contact from "@/components/contact/Contact";
import { PageTitle } from "@/components/PageTitle";
import React from "react";
import { baseUrl } from "@/utils/baseUrl";

export const metadata = {
  title: "Šarolika Kuhinja - Kontaktirajte nas",
  description:
    "Možete nas kontaktirati ispunjavanjem forme ili putem kontakt informacija.",
  openGraph: {
    title: "Šarolika Kuhinja - Kontaktirajte nas",
    description:
      "Možete nas kontaktirati ispunjavanjem forme ili putem kontakt informacija.",
    url: `${baseUrl}/kontakt`,
    images: [
      {
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 600,
        alt: "Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Šarolika Kuhinja - Kontaktirajte nas",
    description:
      "Možete nas kontaktirati ispunjavanjem forme ili putem kontakt informacija.",
    image: `${baseUrl}/images/logo.png`,
  },
};

export default function ContactUsPage() {
  return (
    <div className="page contact-page">
      <PageTitle
        title="Kontaktirajte nas"
        shortDesc="Možete nas kontaktirati ispunjavanjem forme ili putem kontakt informacija."
      />
      <Contact />
    </div>
  );
}
