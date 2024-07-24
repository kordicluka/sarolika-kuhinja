import React from 'react'

export default function Facebook() {
  return (
    <>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 248.04 248.04"
        className="social-icon"
      >
        <defs>
          <linearGradient
            id="facebook-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: '#1877F2', stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#1877F2', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          className="cls-1"
          d="m124.02,0C55.53,0,0,55.53,0,124.02s55.53,124.02,124.02,124.02,124.02-55.53,124.02-124.02S192.52,0,124.02,0Zm41.73,70.33h-14.62c-8.07,0-16.54,5.02-16.54,13.85v23.84h30l-5,31.52h-25v78.05h-33.83v-78.05h-28.45v-31.52h28.45v-23.45c0-23.48,13.83-43.06,38.83-41.54l26.16,1.16v26.13Z"
          fill="url(#facebook-gradient)"
        />
      </svg>
    </>
  )
}
