'use client'
import React, { useEffect, useState } from 'react'
import NextImage from 'next/image'

const applyMediaQueries = (style) => {
  if (!style) return {}

  let finalStyle = { ...style }

  if (typeof window !== 'undefined') {
    const mediaQueries = Object.keys(style).filter((key) => key.startsWith('('))

    mediaQueries.forEach((query) => {
      const mq = window.matchMedia(query)
      if (mq.matches) {
        finalStyle = { ...finalStyle, ...style[query] }
      }
    })

    // Remove media queries from final style object
    mediaQueries.forEach((query) => {
      delete finalStyle[query]
    })
  }

  return finalStyle
}

const RenderElement = ({ element }) => {
  const { type, style, data, children, className } = element
  const [finalStyle, setFinalStyle] = useState(style)

  useEffect(() => {
    setFinalStyle(applyMediaQueries(style))
  }, [style])

  switch (type) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
    case 'p':
      return React.createElement(
        type,
        { style: finalStyle, className },
        data?.text
      )
    case 'img':
      return (
        <NextImage
          src={
            data?.src === 'placeholder-image.svg'
              ? '/uploads/placeholder-image.svg'
              : data?.src
          }
          alt={data?.alt}
          style={finalStyle}
          width={1500}
          height={1500}
          className={className ? className : ''}
        />
      )
    case 'ul':
      return (
        <ul style={finalStyle} className={className ? className : ''}>
          {data?.items?.map((item, index) => (
            <li key={index} style={item.style}>
              {item.text}
            </li>
          ))}
        </ul>
      )
    case 'div':
      return (
        <div style={finalStyle} className={className ? className : ''}>
          {children?.map((child, index) => (
            <React.Fragment key={index}>
              <RenderElement element={child} />
            </React.Fragment>
          ))}
        </div>
      )
    case 'section':
      return (
        <section style={finalStyle} className={className ? className : ''}>
          {children?.map((child, index) => (
            <React.Fragment key={index}>
              <RenderElement element={child} />
            </React.Fragment>
          ))}
        </section>
      )
    case 'content':
      return (
        <div
          style={finalStyle}
          className={className ? className : ''}
          dangerouslySetInnerHTML={{ __html: data?.text }}
        />
      )

    default:
      return null
  }
}

const JSXContentRenderer = ({ content }) => {
  if (!content || Object.keys(content).length === 0) return null
  return <RenderElement element={content} />
}

export default JSXContentRenderer
