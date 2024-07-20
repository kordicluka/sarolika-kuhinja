import React from "react";
import Head from "next/head";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import NextImage from "next/image";
import { formatDate } from "@/utils/formatDate";
import Facebook from "@/components/Facebook";
import Instagram from "@/components/Instagram";
import WhatsApp from "@/components/WhatsUpp";
import ItemContent from "@/components/ItemContent";
import CopyToClipboard from "@/components/CopyToClipboard";

export const metadata = {
  title: "Blog Post",
  description: "Blog post details",
};

export default async function BlogPage({ params }) {
  const { slug } = params;

  const item = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  // Parse the sections field
  if (item && item.sections) {
    try {
      item.sections = JSON.parse(item.sections);
    } catch (error) {
      console.error("Error parsing sections JSON:", error);
      item.sections = [];
    }
  }

  return (
    <>
      <Head>
        <title>{item?.title} - Blog Post</title>
        <meta name="description" content={item?.description} />
        <meta property="og:title" content={item?.title} />
        <meta property="og:description" content={item?.description} />
        <meta property="og:image" content={`/uploads/${item?.image}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={item?.title} />
        <meta name="twitter:description" content={item?.description} />
        <meta name="twitter:image" content={`/uploads/${item?.image}`} />
      </Head>
      <main className="page item-page">
        <article>
          <header className="post-header">
            <h1>{item?.title}</h1>
            <p className="description">{item?.description}</p>
            <div className="author-share">
              <div className="author">
                <div className="author-image">
                  {item?.createdBy?.image ? (
                    <NextImage
                      src={`/uploads/${item.createdBy.image}`}
                      alt={item.createdBy.name}
                      width={100}
                      height={100}
                    />
                  ) : (
                    <span className="author-image-placeholder">
                      {item.createdBy.name.charAt(0).toUpperCase()}
                      {item.createdBy.name.split(" ")[1]
                        ? item.createdBy.name
                            .split(" ")[1]
                            .charAt(0)
                            .toUpperCase()
                        : null}
                    </span>
                  )}
                </div>
                <div className="author-name">
                  <p>{item?.createdBy?.name}</p>
                  <span>{formatDate(item?.createdAt)}</span>
                </div>
              </div>
              <div className="share">
                <a href="#" className="social" aria-label="Share on Facebook">
                  <Facebook />
                </a>
                <a href="#" className="social" aria-label="Share on Instagram">
                  <Instagram />
                </a>
                <a href="#" className="social" aria-label="Share on WhatsApp">
                  <WhatsApp />
                </a>
                <CopyToClipboard />
              </div>
            </div>
          </header>
          <section className="image-container">
            <NextImage
              src={`/uploads/${item?.image}`}
              alt={`Image of ${item?.title}`}
              width={1500}
              height={1500}
              priority
            />
          </section>
          <ItemContent sections={item.sections} />
        </article>
      </main>
    </>
  );
}
