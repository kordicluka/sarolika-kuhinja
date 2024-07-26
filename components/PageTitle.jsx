import React from 'react'
import '@/styles/PageTitle.scss'

export const PageTitle = ({ title, shortDesc }) => {
  return (
    <section className="page-title">
      <h2>{title}</h2>
      <p>{shortDesc}</p>
    </section>
  )
}
