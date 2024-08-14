"use client";
import { signOutNewsletterUser } from "@/actions/NewsletterUsersActions";
import React from "react";
import toast from "react-hot-toast";
import ToasterComponent from "./dashboard/ToasterComponent";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function SignOutFromNewsletterButton({ email, text }) {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await signOutNewsletterUser(email);

      if (text === "kliknite ovdje") {
        alert(res?.message);
        router.push("/");
      } else {
        toast((t) => (
          <ToasterComponent
            title={"Odjava s newslettera"}
            t={t}
            state={res?.ok ? "success" : "error"}
            message={"Korisnik je uspješno odjavljen s newslettera."}
          />
        ));
      }
    } catch (error) {
      console.error("Error signing out from newsletter:", error);
      alert("Došlo je do pogreške. Molimo pokušajte ponovno kasnije.");
    }
  };

  return (
    <button className="sign-out-from-newsletter-button" onClick={handleClick}>
      {" "}
      {text}
    </button>
  );
}
