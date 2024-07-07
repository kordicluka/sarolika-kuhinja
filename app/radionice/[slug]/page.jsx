import React from "react";
import prisma from "@/utils/db";
import ApplicateToWorkshopForm from "@/components/workshop/ApplicateToWorkshopForm";

export default async function WorkshopPage({ params }) {
  const { slug } = params;

  const item = await prisma.workshop.findUnique({
    where: {
      slug: slug,
    },
    include: {
      _count: {
        select: { applications: true },
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
    <main>
      <h1>Radionica</h1>
      <p>Radionica je stranica koja prikazuje sve informacije o radionici.</p>
      {item && (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Broj prijavljenih: {item._count.applications}</p>
        </>
      )}
      <ApplicateToWorkshopForm workshop={item} />
    </main>
  );
}
