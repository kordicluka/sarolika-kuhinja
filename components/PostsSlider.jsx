import React from "react";
import { ItemsSlider } from "./ItemsSlider";
import prisma from "@/utils/db";

export default async function PostsSlider() {
  const items = await prisma.post.findMany({
    where: {
      isVisible: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      slug: true,
      image: true,
      description: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return <ItemsSlider type="posts" items={items} />;
}
