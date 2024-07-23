'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import '@/styles/LoginForm.scss'
import { useRouter } from 'next/navigation'
import logo from '@/public/images/logo.png'
import NextImage from 'next/image'
import toast from 'react-hot-toast'
import ToasterComponent from './ToasterComponent'
import Link from 'next/link'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!email) {
      newErrors.email = 'Email je obavezan.'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Unesite važeću email adresu.'
    }

    if (!password) {
      newErrors.password = 'Lozinka je obavezna.'
    } else if (password.length < 6) {
      newErrors.password = 'Lozinka mora imati najmanje 6 karaktera.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      return
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.ok) {
      router.push('/dashboard')
      toast((t) => (
        <ToasterComponent
          title={'Dobro došli u admin aplikaciju!'}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={'Unijeli ste ispravne podatke.'}
        />
      ))
    } else {
      toast((t) => (
        <ToasterComponent
          title={'Uneseni podatci nisu ispravni'}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={'Molimo pokušajte ponovo.'}
        />
      ))
    }
  }

  return (
    <div className="login-form">
      <div className="top-login-form">
        <NextImage src={logo.src} alt="Logo" width={200} height={200} />
      </div>

      <h6>Dobro došli u admin aplikaciju.</h6>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Lozinka"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <button type="submit" className="btn">
          Prijavi se
        </button>
      </form>
      <div className="note"></div>
      <div className="forgot-password">
        <Link href="/forgot-password">Zaboravili ste lozinku?</Link>
      </div>
      <div className="bottom-login-form">
        <p>© 2024. Sva prava zadržana.</p>
      </div>
    </div>
  )
}
