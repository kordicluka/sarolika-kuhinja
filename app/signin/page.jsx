import LoginForm from "@/components/LoginForm";
import hero from "@/public/images/hero.webp";
import "@/styles/LoginPage.scss";
import { getServerSession } from "next-auth";
import NextImage from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="login-page">
      {" "}
      <LoginForm />
    </main>
  );
}
