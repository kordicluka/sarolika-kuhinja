import React from 'react'
import prisma from '@/utils/db'
import NextImage from 'next/image'
import { formatDate } from '@/utils/formatDate'
import Facebook from '@/components/Facebook'
import Instagram from '@/components/Instagram'
import WhatsApp from '@/components/WhatsUpp'
import ItemContent from '@/components/ItemContent'
import CopyToClipboard from '@/components/CopyToClipboard'
import ApplicateToWorkshopForm from '@/components/workshop/ApplicateToWorkshopForm'
import '@/styles/ItemPage.scss'
import { baseUrl } from '@/utils/baseUrl'
import Link from 'next/link'
import OtherWorkshops from '@/components/OtherWorkshops'

export async function generateMetadata({ params }) {
  const { slug } = params
  const item = await prisma.workshop.findUnique({
    where: { slug },
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
    title: `Šarolika Kuhinja - ${item?.title} - Radionica`,
    description: item?.description,
    openGraph: {
      title: `Šarolika Kuhinja - ${item?.title} - Radionica`,
      description: item?.description,
      url: `${baseUrl}/workshops/${slug}`,
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
        section: 'Workshops',
        tags: item?.sections?.map((section) => section.title), // Assuming sections have titles
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `Šarolika Kuhinja - ${item?.title} - Radionica`,
      description: item?.description,
      image: `${baseUrl}/uploads/${item?.image}`,
    },
  }
}

export default async function WorkshopPage({ params }) {
  const { slug } = params

  const item = await prisma.workshop.findUnique({
    where: { slug },
    include: {
      createdBy: { select: { id: true, name: true, image: true } },
      _count: { select: { applications: true } },
    },
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

      {(item?.date > new Date()) &
      (item?.maxApplicant > item?._count.applications) ? (
        <ApplicateToWorkshopForm workshop={item} />
      ) : item?.date < new Date() ? (
        <div className="workshop-unable-to-apply">
          <h3 className="workshop-filled-with-applicants">
            Pogledajte kako name je bilo na radionici skrolajući dolje!
          </h3>
          <p>
            Radionca je već održana, ali možete vidjeti kako nam je bilo na
            njoj.
          </p>
          <div className="image-and-other-workshops">
            <NextImage
              src={item.image}
              alt="Workshop image"
              height={1500}
              width={1500}
              priority
              className="workshop-image"
            />
            <div className="other-workshops">
              <h5>Pogledajte naše sljedeće radionice </h5>
              <p>
                Klikom na radionicu možete vidjeti detalje i prijaviti se na
                nju!
              </p>{' '}
              <OtherWorkshops id={item.id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="workshop-unable-to-apply">
          <h3 className="workshop-filled-with-applicants">
            Radionica je popunjena sa prijavama!
          </h3>
          <p>Nadamo se da ćete se prijaviti na neku drugu radionicu!</p>
          <div className="image-and-other-workshops">
            <NextImage
              src={item.image}
              alt="Workshop image"
              height={1500}
              width={1500}
              priority
              className="workshop-image"
            />{' '}
            <div className="other-workshops">
              <h5>Pogledajte naše druge radionice </h5>{' '}
              <p>
                Klikom na radionicu možete vidjeti detalje i prijaviti se na
                nju!
              </p>
              <OtherWorkshops id={item.id} />
            </div>
          </div>
        </div>
      )}

      <ItemContent sections={item.sections} />
    </main>
  )
}
