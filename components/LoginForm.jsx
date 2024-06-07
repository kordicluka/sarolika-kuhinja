"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import "@/styles/LoginForm.scss";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Pogrešno korisničko ime ili lozinka.");
    }
  };

  return (
    <div className="login-form">
      {" "}
      <h2>Dobro došli u admin aplikaciju.</h2>
      <p>
        Molimo unesite korisničko ime i lozinku kako biste nastavili. Ukoliko
        nemate račun kontaktirajte administratora.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Lozinka"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Prijavi se
        </button>
      </form>
      <div className="note"></div>
      <div className="forgot-password">
        <a href="/forgot-password">Zaboravili ste lozinku?</a>
      </div>
    </div>
  );
}
