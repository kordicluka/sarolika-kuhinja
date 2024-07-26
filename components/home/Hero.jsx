import React from 'react'
import '@/styles/Hero.scss'
import NextImage from 'next/image'
import { Caveat } from 'next/font/google'
import Link from 'next/link'

const caveat = Caveat({
  weights: [400, 700],
  subsets: ['latin'],
})

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h3 className={caveat.className}>Poticanje djece na zdravo!</h3>
        <h1>Radionice kuhanja za djecu.</h1>
        <div className="hero-content-location">
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
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>

          <span>Kaptol Centar, Zagreb</span>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel pariatur
          amet consequatur eaque, ipsam repellendus laborum nihil placeat totam
          culpa id at autem maiores. Doloribus ad excepturi perferendis quidem
          reprehenderit culpa non recusandae pariatur molestias.
        </p>
        <div className="links">
          <Link href="/radionice" className="btn primary">
            <span> Sve radionice</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>{' '}
          <Link href="/radionice" className="btn primary">
            <span> Pročitajte blog</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
              />
            </svg>
          </Link>
        </div>
      </div>
      <NextImage
        src="/images/hero.webp"
        alt="Hero Image"
        className="hero-image"
        width={1200}
        height={1200}
      />
    </section>
  )
}
