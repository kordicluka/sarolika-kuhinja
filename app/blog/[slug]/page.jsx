import React from "react";
import prisma from "@/utils/db";
import "@/styles/ItemPage.scss";
import NextImage from "next/image";
import { formatDate } from "@/utils/formatDate";

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
        </div>
      </section>
      <section className="image-container">
        <NextImage
          src={"/uploads/" + item?.image}
          alt={item?.title}
          width={1000}
          height={1000}
        />
      </section>
    </main>
  );
}
