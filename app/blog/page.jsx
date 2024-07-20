import React from "react";

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

  return <main className="page"></main>;
}
