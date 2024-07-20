import React from "react";

export default async function MealsPage() {
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
      {items.map((item) => (
        <article key={item.id} className="post">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <time dateTime={item.createdAt}>
            {new Date(item.createdAt).toLocaleDateString()}
          </time>
        </article>
      ))}
    </main>
  );
}
