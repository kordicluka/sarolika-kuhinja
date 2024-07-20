import React from "react";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import { baseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/formatDate";
import "@/styles/ItemsPage.scss";
import NextImage from "next/image";
import limitTextChar from "@/utils/limitTextChar";
import { PageTitle } from "@/components/PageTitle";
import { formatTime } from "@/utils/formatTime";

export const metadata = {
  title: "Šarolika Kuhinja - Radionice",
  description: "Budite u toku s našim najnovijim objavama radionica.",
  openGraph: {
    title: "Šarolika Kuhinja - Radionice",
    description: "Budite u toku s našim najnovijim objavama radionica.",
    url: `${baseUrl}/radionice`,
    images: [
      {
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 600,
        alt: "Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Šarolika Kuhinja - Radionice",
    description: "Budite u toku s našim najnovijim objavama radionica.",
    image: `${baseUrl}/images/logo.png`,
  },
};

export default async function WorkshopsPage() {
  const items = await prisma.workshop.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      date: "desc",
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
  });

  return (
    <main className="page workshops-page">
      <PageTitle
        title="Prijavite djecu na naše radionice"
        shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum dolorem illo necessitatibus facere corrupti incidunt animi consequatur inventore hic accusantium molestias suscipit reiciendis tempora mis iure?"
      />
      <section className="newest-workshops">
        <article className="newest-workshop-item">
          <a href={`/radionice/${items[0].slug}`} className="workshop-link">
            <div className="image-container">
              <NextImage
                src={`/uploads/${items[0].image}`}
                alt={items[0].title}
                width={1200}
                height={800}
              />
            </div>
            <div className="info">
              <time>
                {formatDate(items[0].date) +
                  " - " +
                  formatTime(items[0].date) +
                  " h"}
              </time>
              <h2>{items[0].title}</h2>
              <p>{limitTextChar(items[0].description, 100)}</p>
              {items[0]?.date > new Date() ? (
                <div className="workshop-availability active">
                  Kliknite za prijavu
                </div>
              ) : (
                <div className="workshop-availability unactive">
                  Prošla radionica - pogledajte kako je bilo!
                </div>
              )}
            </div>
          </a>
        </article>
        <div className="newest-workshops-list">
          {items.slice(1, 5).map((item) => (
            <article key={item.id} className="workshop-item">
              <a href={`/radionice/${item.slug}`} className="workshop-link">
                <div className="image-container">
                  <NextImage
                    src={`/uploads/${item.image}`}
                    alt={item.title}
                    width={400}
                    height={300}
                  />
                </div>
                <div className="info">
                  <time>
                    {" "}
                    {formatDate(item.date) +
                      " - " +
                      formatTime(item.date) +
                      " h"}
                  </time>
                  <h6>{item.title}</h6>
                  <p>{limitTextChar(item.description, 100)}</p>
                  {item?.date > new Date() ? (
                    <div className="workshop-availability active">
                      Kliknite za prijavu
                    </div>
                  ) : (
                    <div className="workshop-availability unactive">
                      Prošla radionica - pogledajte kako je bilo!
                    </div>
                  )}
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="workshops-list">
        {items.slice(4).map((item) => (
          <article key={item.id} className="workshop-item">
            <a href={`/radionice/${item.slug}`} className="workshop-link">
              <div className="image-container">
                <NextImage
                  src={`/uploads/${item.image}`}
                  alt={item.title}
                  width={400}
                  height={300}
                />
              </div>
              <div className="info">
                <time>
                  {formatDate(item.date) + " - " + formatTime(item.date) + " h"}
                </time>
                <h6>{item.title}</h6>
                <p>{limitTextChar(item.description, 100)}</p>
                {item?.date > new Date() ? (
                  <div className="workshop-availability active">
                    Kliknite za prijavu
                  </div>
                ) : (
                  <div className="workshop-availability unactive">
                    Prošla radionica - pogledajte kako je bilo!
                  </div>
                )}
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
