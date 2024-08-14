import React, { forwardRef } from 'react'
import NextImage from 'next/image'
import limitTextChar from '@/utils/limitTextChar'
import '@/styles/ItemCard.scss'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'
import Link from 'next/link'

const ItemCard = forwardRef(({ item, type }, ref) => {
  return (
    <Link
      href={`/${
        type === 'workshops' ? 'radionice' : type === 'posts' ? 'blog' : 'jela'
      }/${item.slug}`}
      className={type === 'meals' ? 'item-card meal' : 'item-card'}
      ref={ref}
    >
      <div className="item-card-image">
        <NextImage src={item.image} alt={item.title} width={500} height={500} />
      </div>
      <div className="item-card-info">
        <h6 className="item-card-info-date">
          {item?.date
            ? formatDate(item.date) + ' - ' + formatTime(item.date) + ' h'
            : formatDate(item.createdAt)}
        </h6>
        <h6 className="item-card-info-title">{item.title}</h6>
        <p className="item-card-info-desc">
          {limitTextChar(item.description, 100)}
        </p>
        {type === 'workshops' && item?.date > new Date() ? (
          <div className="workshop-avilability active">
            {' '}
            Kliknite za prijavu
          </div>
        ) : type === 'workshops' && item?.date < new Date() ? (
          <div className="workshop-avilability unactive">
            Prošla radionica - pogledajte kako je bilo!
          </div>
        ) : null}
      </div>
    </Link>
  )
})

ItemCard.displayName = 'ItemCard'

export default ItemCard
