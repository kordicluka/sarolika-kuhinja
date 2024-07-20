import React from "react";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import { baseUrl } from "@/utils/baseUrl";
import { formatDate } from "@/utils/formatDate";

export async function generateMetadata() {
  const latestPost = await prisma.post.findFirst({
    where: {
      isVisible: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      description: true,
      slug: true,
      image: true,
      createdAt: true,
    },
  });

  return {
    title: "Blog - Najnovije objave",
    description:
      "Budite u toku s našim najnovijim blog objavama o raznim temama.",
    openGraph: {
      title: "Blog - Najnovije objave",
      description:
        "Budite u toku s našim najnovijim blog objavama o raznim temama.",
      url: `${baseUrl}/blog`,
      images: latestPost
        ? [
            {
              url: `${baseUrl}/uploads/${latestPost.image}`,
              width: 800,
              height: 600,
              alt: latestPost.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog - Najnovije objave",
      description:
        "Budite u toku s našim najnovijim blog objavama o raznim temama.",
      image: latestPost ? `${baseUrl}/uploads/${latestPost.image}` : "",
    },
  };
}

export default async function BlogsPage() {
  const items = await prisma.post.findMany({
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
    <main className="page">
      <section className="blogs-list">
        {items.map((item, index) => (
          <article key={item.id} className="blog-item">
            <a href={`/blog/${item.slug}`} className="blog-link">
              <img src={`/uploads/${item.image}`} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <time>{formatDate(item.createdAt)}</time>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
