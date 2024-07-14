import prisma from "@/utils/db";

export default async function WorkshopsPage() {
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

  return <main className="page"></main>;
}
