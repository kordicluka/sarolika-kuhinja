import React from "react";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import NextImage from "next/image";
import { formatDate } from "@/utils/formatDate";
import Facebook from "@/components/Facebook";
import Instagram from "@/components/Instagram";
import WhatsApp from "@/components/WhatsUpp";
import ItemContent from "@/components/ItemContent";

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

  console.log("Item,sections:", item.sections);

  return (
    <main className="page">
      <section className="post-header">
        <h5> </h5>
        <h3>{item?.title}</h3>{" "}
        <p className="description">{item?.description}</p>
        <div className="author-share">
          <div className="author">
            {" "}
            <div className="author-image">
              {item?.createdBy?.image ? (
                <NextImage
                  src={"/uploads/" + item.createdBy.image}
                  alt={item.createdBy.name}
                  width={100}
                  height={100}
                />
              ) : (
                <span className="author-image-placeholder">
                  {item.createdBy.name.charAt(0).toUpperCase()}
                  {item.createdBy.name.split(" ")[1]
                    ? item.createdBy.name.split(" ")[1].charAt(0).toUpperCase()
                    : null}
                </span>
              )}{" "}
            </div>
            <div className="author-name">
              <p>{item?.createdBy?.name}</p>
              <span>{formatDate(item?.createdAt)} </span>
            </div>
          </div>
          <div className="share">
            {" "}
            <a href="#" className="social">
              <Facebook />
            </a>
            <a href="#" className="social">
              <Instagram />
            </a>
            <a href="#" className="social">
              <WhatsApp />
            </a>
            <button className="share-button">
              {" "}
              <span>Podijeli</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section className="image-container">
        <NextImage
          src={"/uploads/" + item?.image}
          alt={item?.title}
          width={1500}
          height={1500}
        />
      </section>

      <ItemContent sections={item.sections} />
    </main>
  );
}
