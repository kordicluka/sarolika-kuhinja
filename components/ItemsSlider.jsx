'use client'
import React, { useEffect, useRef } from 'react'
import { Caveat } from 'next/font/google'
import '@/styles/ItemsSlider.scss'
import ItemCard from './items/ItemCard'
import Link from 'next/link'

const caveat = Caveat({
  weights: [400, 700],
  subsets: ['latin'],
})

export const ItemsSlider = ({ type, items }) => {
  const containerRef = useRef(null)
  const itemRef = useRef(null)

  const scrollRight = () => {
    if (containerRef.current && itemRef.current) {
      containerRef.current.scrollBy({
        left: itemRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  const scrollLeft = () => {
    if (containerRef.current && itemRef.current) {
      containerRef.current.scrollBy({
        left: -itemRef.current.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  const getTitleText = () => {
    switch (type) {
      case 'workshops':
        return {
          subtitle: 'Kliknite na radionicu kako bi saznali više',
          title: 'Sljedeće i prethodne radionice',
          link: '/radionice',
        }
      case 'posts':
        return {
          subtitle: 'Zanimljive objave o nutricionizmu',
          title: 'Naš blog',
          link: '/blog',
        }
      default:
        return {
          subtitle: 'Kliknite na jelo kako bi saznali više.',
          title: 'Neka od jela koje pripremamo',
          link: '/jela',
        }
    }
  }

  const { subtitle, title, link } = getTitleText()

  useEffect(() => {
    console.log('ItemRef:', itemRef.current)
  }, [])

  return (
    <section className="items-slider">
      <button className="arrow-button" onClick={scrollLeft}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <button className="arrow-button right-arrow-button" onClick={scrollRight}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      <div className="items-slider-title">
        <div className="items-slider-title-left">
          <h3 className={caveat.className}>{subtitle}</h3>
          <h2>{title}</h2>
        </div>
        <div className="items-slider-title-right">
          <Link href={link} className="btn primary">
            <span>Pogledajte sve</span>
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
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="items-container" ref={containerRef}>
        <div className="items-container-inner">
          {items?.length > 0 &&
            items.map((item) => (
              <ItemCard
                key={item.id} // Unique key assigned here
                item={item}
                type={type}
                ref={itemRef}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
