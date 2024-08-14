import React from 'react'
import prisma from '@/utils/db'
import '@/styles/ItemPage.scss'
import { baseUrl } from '@/utils/baseUrl'
import { formatDate } from '@/utils/formatDate'
import { formatTime } from '@/utils/formatTime'
import '@/styles/ItemsPage.scss'
import NextImage from 'next/image'
import limitTextChar from '@/utils/limitTextChar'
import { PageTitle } from '@/components/PageTitle'
import Link from 'next/link'

export const metadata = {
  title: 'Šarolika Kuhinja - Radionice',
  description: 'Budite u toku s našim najnovijim objavama radionica.',
  openGraph: {
    title: 'Šarolika Kuhinja - Radionice',
    description: 'Budite u toku s našim najnovijim objavama radionica.',
    url: `${baseUrl}/radionice`,
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
    title: 'Šarolika Kuhinja - Radionice',
    description: 'Budite u toku s našim najnovijim objavama radionica.',
    image: `${baseUrl}/images/logo.png`,
  },
}

export default async function WorkshopsPage() {
  const items = await prisma.workshop.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      date: 'asc',
    },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      image: true,
      createdAt: true,
      date: true,
    },
  })

  const now = new Date()
  const upcomingWorkshops = items.filter((item) => item.date >= now)
  const pastWorkshops = items.filter((item) => item.date < now)

  return (
    <main className="page workshops-page">
      <PageTitle
        title="Prijavite djecu na naše radionice"
        shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum dolorem illo necessitatibus facere corrupti incidunt animi consequatur inventore hic accusantium molestias suscipit reiciendis tempora mis iure?"
      />
      <section className="newest-workshops">
        {upcomingWorkshops.length > 0 && (
          <article className="newest-workshop-item">
            <Link
              href={`/radionice/${upcomingWorkshops[0].slug}`}
              className="workshop-link"
            >
              <div className="image-container">
                <NextImage
                  src={`${upcomingWorkshops[0].image}`}
                  alt={upcomingWorkshops[0].title}
                  width={1200}
                  height={800}
                />
              </div>
              <div className="info">
                <time>
                  {formatDate(upcomingWorkshops[0].date) +
                    ' - ' +
                    formatTime(upcomingWorkshops[0].date) +
                    ' h'}
                </time>
                <h2>{upcomingWorkshops[0].title}</h2>
                <p>{limitTextChar(upcomingWorkshops[0].description, 150)}</p>
                <div className="workshop-availability active">
                  Kliknite za prijavu
                </div>
              </div>
            </Link>
          </article>
        )}
        <div className="newest-workshops-list">
          {upcomingWorkshops.slice(1, 5).map((item) => (
            <article key={item.id} className="workshop-item">
              <Link href={`/radionice/${item.slug}`} className="workshop-link">
                <div className="image-container">
                  <NextImage
                    src={`${item.image}`}
                    alt={item.title}
                    width={400}
                    height={300}
                  />
                </div>
                <div className="info">
                  <time>
                    {formatDate(item.date) +
                      ' - ' +
                      formatTime(item.date) +
                      ' h'}
                  </time>
                  <h6>{item.title}</h6>
                  <p>{limitTextChar(item.description, 150)}</p>
                  <div className="workshop-availability active">
                    Kliknite za prijavu
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="workshops-list">
        {pastWorkshops.map((item) => (
          <article key={item.id} className="workshop-item">
            <Link href={`/radionice/${item.slug}`} className="workshop-link">
              <div className="image-container">
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
                <p>{limitTextChar(item.description, 150)}</p>
                <div className="workshop-availability unactive">
                  Prošla radionica - pogledajte kako je bilo!
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
