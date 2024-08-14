import React from 'react'
import prisma from '@/utils/db'
import '@/styles/ItemPage.scss'
import { baseUrl } from '@/utils/baseUrl'
import { formatDate } from '@/utils/formatDate'
import '@/styles/ItemsPage.scss'
import NextImage from 'next/image'
import limitTextChar from '@/utils/limitTextChar'
import { PageTitle } from '@/components/PageTitle'
import Link from 'next/link'

export const metadata = {
  title: 'Šarolika Kuhinja - Blog',
  description:
    'Budite u toku s našim najnovijim blog objavama o raznim temama.',
  openGraph: {
    title: 'Šarolika Kuhinja - Blog',
    description:
      'Budite u toku s našim najnovijim blog objavama o raznim temama.',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 600,
        alt: 'Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Šarolika Kuhinja - Blog',
    description:
      'Budite u toku s našim najnovijim blog objavama o raznim temama.',
    image: `${baseUrl}/images/logo.png`,
  },
}

export default async function BlogsPage() {
  const items = await prisma.post.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      image: true,
      createdAt: true,
    },
  })

  return (
    <main className="page blog-page">
      <PageTitle
        title="Blog"
        shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum dolorem illo necessitatibus facere corrupti incidunt animi consequatur inventore hic accusantium molestias suscipit reiciendis tempora mis iure?"
      />
      <section className="newest-blogs">
        <article className="newest-blog-item">
          <Link href={`/blog/${items[0].slug}`} className="blog-link">
            <div className="image-container">
              <NextImage
                src={items[0].image}
                alt={items[0].title}
                width={1200}
                height={800}
              />
            </div>
            <div className="info">
              {' '}
              <time>{formatDate(items[0].createdAt)}</time>
              <h2>{items[0].title}</h2>
              <p>{limitTextChar(items[0].description, 150)}</p>
            </div>
          </Link>
        </article>
        <div className="newest-blogs-list">
          {items.slice(1, 5).map((item) => (
            <article key={item.id} className="blog-item">
              <Link href={`/blog/${item.slug}`} className="blog-link">
                {' '}
                <div className="image-container">
                  <NextImage
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                  />
                </div>
                <div className="info">
                  {' '}
                  <time>{formatDate(item.createdAt)}</time>
                  <h6>{item.title}</h6>
                  <p>{limitTextChar(item.description, 150)}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="blogs-list">
        {items.slice(4).map((item) => (
          <article key={item.id} className="blog-item">
            <Link href={`/blog/${item.slug}`} className="blog-link">
              {' '}
              <div className="image-container">
                <NextImage
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                />
              </div>
              <div className="info">
                <time>{formatDate(item.createdAt)}</time>
                <h6>{item.title}</h6>
                <p>{limitTextChar(item.description, 150)}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
