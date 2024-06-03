import LoginForm from "@/components/LoginForm";
import hero from "@/images/hero.webp";
import "@/styles/loginPage.scss";
import NextImage from "next/image";

export default function SignIn() {
  return (
    <main className="login-page">
      <NextImage src={hero} alt="Hero" className="background-image" />
      <LoginForm />
    </main>
  );
}
