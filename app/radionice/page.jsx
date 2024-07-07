import React from "react";
import prisma from "@/utils/db";

export default async function page() {
  const workshops = await prisma.workshop.findMany({
    where: {
      isVisible: true,
    },
    select: {
      slug: true,
      title: true,
      description: true,
      image: true,
      date: true,
    },
  });

  console.log(workshops[0].slug);

  return <main></main>;
}
