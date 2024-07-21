import React from "react";
import "@/styles/VerifyNewsletterUserEmailPage.scss";
import SignOutFromNewsletterButton from "@/components/SignOutFromNewsletterButton";
import { verifyNewsletterUser } from "@/actions/NewsletterUsersActions";
import Link from "next/link";

export default async function VerifyNewsletterUserEmailPage({ searchParams }) {
  const { token } = searchParams;

  let email = null;

  const res = await verifyNewsletterUser(token);

  console.log("res", res);

  if (res.ok) {
    email = res.email;
  } else {
    return (
      <main className="page verify-newsletter-user-email-page">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 error-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

        <h3>Došlo je do pogreške prilikom verifikacije vašeg emaila.</h3>
        <p>Molimo pokušajte ponovno ili kontaktirajte podršku.</p>
        <Link href="/kontakt" className="btn primary">
          Kontaktirajte nas
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
        </Link>
      </main>
    );
  }

  return (
    <main className="page verify-newsletter-user-email-page">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 success-icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>

      <h3>Uspješno ste verificirali svoj email!</h3>
      <p>
        Sada ćete primati najnovije vijesti i informacije o našim radionicama
        putem newslettera.
      </p>

      <span className="sign-out-newsletter">
        *Ukoliko želite odjaviti se s newslettera,{" "}
        <SignOutFromNewsletterButton email={email} text="kliknite ovdje" />
      </span>
    </main>
  );
}
