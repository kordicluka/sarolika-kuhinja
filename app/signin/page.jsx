import LoginForm from "@/components/LoginForm";
import hero from "@/public/images/hero.webp";
import "@/styles/LoginPage.scss";
import { getServerSession } from "next-auth";
import NextImage from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (session) {
    console.log(session);
  }

  return (
    <main className="login-page">
      {" "}
      <LoginForm />
      <NextImage src={hero} alt="Hero" className="background-image" />
    </main>
  );
}
