import { get3NextWortkshopsWithoutThis } from '@/actions/WorkshopsActions'
import Link from 'next/link'
import React from 'react'
import NextImage from 'next/image'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'
import limitTextChar from '@/utils/limitTextChar'

export default async function OtherWorkshops({ id }) {
  const res = await get3NextWortkshopsWithoutThis(id)

  const { workshops } = res

  return (
    <>
      {workshops.map((item) => (
        <article key={item.id} className="workshop-item">
          <Link href={`/radionice/${item.slug}`} className="workshop-link">
            <div className="other-image-container">
              <NextImage
                src={`${item.image}`}
                alt={item.title}
                width={400}
                height={300}
              />
            </div>
            <div className="info">
              <time>
                {formatDate(item.date) + ' - ' + formatTime(item.date) + ' h'}
              </time>
              <h6>{item.title}</h6>
              <p>{limitTextChar(item.description, 100)}</p>
              <div className="workshop-availability active">
                Kliknite za prijavu
              </div>
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}
