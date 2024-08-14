import React from 'react'
import '@/styles/DashboardPageNavigation.scss'
import Link from 'next/link'

export default function DashboardPageNavigation({ links }) {
  return (
    <div className="dashboard-page-navigation">
      <div className="dashboard-page-navigation-left">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="dashboard-page-navigation-link"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="dashboard-page-navigation-right"> </div>
    </div>
  )
}
