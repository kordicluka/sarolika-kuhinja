import React from 'react'
import prisma from '@/utils/db'
import NextImage from 'next/image'
import { formatDate } from '@/utils/formatDate'
import Facebook from '@/components/Facebook'
import Instagram from '@/components/Instagram'
import WhatsApp from '@/components/WhatsUpp'
import ItemContent from '@/components/ItemContent'
import CopyToClipboard from '@/components/CopyToClipboard'
import '@/styles/ItemPage.scss'
import { baseUrl } from '@/utils/baseUrl'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const { slug } = params
  const item = await prisma.meal.findUnique({
    where: { slug },
    include: { createdBy: { select: { id: true, name: true, image: true } } },
  })

  if (item && item.sections) {
    try {
      item.sections = JSON.parse(item.sections)
    } catch (error) {
      console.error('Error parsing sections JSON:', error)
      item.sections = []
    }
  }

  return {
    title: `Šarolika Kuhinja - ${item?.title} - Jelo`,
    description: item?.description,
    keywords: item?.sections?.map((section) => section.title).join(', '), // Assuming sections have titles
    author: item?.createdBy?.name,
    openGraph: {
      title: `Šarolika Kuhinja - ${item?.title} - Jelo`,
      description: item?.description,
      url: `${baseUrl}/jela/${slug}`,
      images: [
        {
          url: `${baseUrl}/uploads/${item?.image}`,
          width: 800,
          height: 600,
          alt: item?.title,
        },
      ],
      type: 'article',
      article: {
        publishedTime: item?.createdAt,
        modifiedTime: item?.updatedAt,
        author: item?.createdBy?.name,
        section: 'Meals',
        tags: item?.sections?.map((section) => section.title), // Assuming sections have titles
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `Šarolika Kuhinja - ${item?.title} - Jelo`,
      description: item?.description,
      image: `${baseUrl}/uploads/${item?.image}`,
    },
  }
}

export default async function MealPage({ params }) {
  const { slug } = params
  const item = await prisma.meal.findUnique({
    where: { slug },
    include: { createdBy: { select: { id: true, name: true, image: true } } },
  })

  if (item && item.sections) {
    try {
      item.sections = JSON.parse(item.sections)
    } catch (error) {
      console.error('Error parsing sections JSON:', error)
      item.sections = []
    }
  }

  return (
    <main className="page item-page">
      <section className="post-header">
        <h1>{item?.title}</h1>
        <p className="description">{item?.description}</p>
        <div className="author-share">
          <div className="author">
            <div className="author-image">
              {item?.createdBy?.image ? (
                <NextImage
                  src={`${item.createdBy.image}`}
                  alt={item.createdBy.name}
                  width={100}
                  height={100}
                />
              ) : (
                <span className="author-image-placeholder">
                  {item.createdBy.name.charAt(0).toUpperCase()}
                  {item.createdBy.name.split(' ')[1]?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="author-name">
              <p>{item?.createdBy?.name}</p>
              <span>{formatDate(item?.createdAt)}</span>
            </div>
          </div>
          <div className="share">
            <Link href="#" className="social" aria-label="Share on Facebook">
              <Facebook />
            </Link>
            <Link href="#" className="social" aria-label="Share on Instagram">
              <Instagram />
            </Link>
            <Link href="#" className="social" aria-label="Share on WhatsApp">
              <WhatsApp />
            </Link>
            <CopyToClipboard />
          </div>
        </div>
      </section>
      <section className="image-container">
        <NextImage
          src={`${item?.image}`}
          alt={`Image of ${item?.title}`}
          width={1500}
          height={1500}
          priority
        />
      </section>
      <ItemContent sections={item.sections} />
    </main>
  )
}
