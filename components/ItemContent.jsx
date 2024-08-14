'use client'
import React, { useState, useEffect, useRef } from 'react'
import JSXContentRenderer from './JSXContentRender'

export default function ItemContent({ sections }) {
  const [onHoverSection, setOnHoverSection] = useState(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: '0px',
      threshold: 0.75, // trigger when 75% of the section is visible
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target)
          setOnHoverSection(index)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (index) => {
    const section = document.getElementById(`section-${index}`)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="item-content-container">
      <div className="item-content">
        {sections.map((section, index) => (
          <div
            key={index}
            id={`section-${index}`}
            ref={(el) => (sectionRefs.current[index] = el)}
          >
            <JSXContentRenderer content={section.jsxContent} />
          </div>
        ))}
      </div>
      <div className="item-sidebar">
        <h5>
          Skoči na sekciju{' '}
          <span role="img" aria-label="down arrow">
            ⬇️
          </span>
        </h5>
        {sections.map((section, index) => (
          <button
            key={index}
            className={`section-button ${
              onHoverSection === index ? 'active' : ''
            }`}
            onClick={() => scrollToSection(index)}
          >
            {section.title}
          </button>
        ))}
      </div>
    </div>
  )
}
