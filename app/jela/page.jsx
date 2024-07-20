import React from "react";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import { baseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/formatDate";
import "@/styles/ItemsPage.scss";
import NextImage from "next/image";
import limitTextChar from "@/utils/limitTextChar";
import { PageTitle } from "@/components/PageTitle";
import "@/styles/ItemsPage.scss";

export const metadata = {
  title: "Šarolika Kuhinja - Jela",
  description: "Budite u toku s našim najnovijim objavama jela i receptima.",
  openGraph: {
    title: "Šarolika Kuhinja - Jela",
    description: "Budite u toku s našim najnovijim objavama jela i receptima.",
    url: `${baseUrl}/jela`,
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
    title: "Šarolika Kuhinja - Jela",
    description: "Budite u toku s našim najnovijim objavama jela i receptima.",
    image: `${baseUrl}/images/logo.png`,
  },
};

export default async function MealsPage() {
  const items = await prisma.meal.findMany({
    where: {
      isVisible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      description: true,
      slug: true,
      image: true,
      createdAt: true,
    },
  });

  return (
    <main className="page meals-page">
      <PageTitle
        title="Jela"
        shortDesc="Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum dolorem illo necessitatibus facere corrupti incidunt animi consequatur inventore hic accusantium molestias suscipit reiciendis tempora mis iure?"
      />
      <section className="newest-meals">
        <article className="newest-meal-item">
          <a href={`/jela/${items[0].slug}`} className="meal-link">
            <div className="image-container">
              <NextImage
                src={`/uploads/${items[0].image}`}
                alt={items[0].title}
                width={1200}
                height={800}
              />
            </div>
            <div className="info">
              <time>{formatDate(items[0].createdAt)}</time>
              <h2>{items[0].title}</h2>
              <p>{limitTextChar(items[0].description, 150)}</p>
            </div>
          </a>
        </article>
        <div className="newest-meals-list">
          {items.slice(1, 5).map((item) => (
            <article key={item.id} className="meal-item">
              <a href={`/jela/${item.slug}`} className="meal-link">
                <div className="image-container">
                  <NextImage
                    src={`/uploads/${item.image}`}
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
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="meals-list">
        {items.slice(4).map((item) => (
          <article key={item.id} className="meal-item">
            <a href={`/jela/${item.slug}`} className="meal-link">
              <div className="image-container">
                <NextImage
                  src={`/uploads/${item.image}`}
                  alt={item.title}
                  width={400}
                  height={300}
                />
              </div>
              <div className="info">
                <time>{formatDate(item.createdAt)}</time>
                <h6>{item.title}</h6>
                <p>{limitTextChar(item.description, 100)}</p>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
