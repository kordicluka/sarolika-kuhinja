import LoginForm from '@/components/dashboard/LoginForm'
import hero from '@/public/images/hero.webp'
import '@/styles/LoginPage.scss'
import { getServerSession } from 'next-auth'
import NextImage from 'next/image'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import ToasterProvider from '@/components/dashboard/ToasterProvider'

export default async function SignIn() {
  return (
    <>
      <main className="login-page">
        {' '}
        <LoginForm />
      </main>
      <ToasterProvider />
    </>
  )
}
