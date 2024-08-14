import Hero from "@/components/home/Hero";
import { ItemsSlider } from "@/components/ItemsSlider";
import Marque from "@/components/Marque";
import WhatWeTryToDo from "@/components/home/WhatWeTryToDo";
import WokrshopsSlider from "@/components/WokrshopsSlider";
import WorkshopParts from "@/components/home/WorkshopParts";
import OurTeam from "@/components/OurTeam";
import { Reviews } from "@/components/Reviews";
import { MealsWeMake } from "@/components/home/MealsWeMake";
import PostsSlider from "@/components/PostsSlider";
import MealsSlider from "@/components/MealsSlider";
import Location from "@/components/Location";
import { baseUrl } from "@/utils/baseUrl";

export const metadata = {
  title: "Šarolika Kuhinja - Početna",
  description:
    "Dobrodošli na našu početnu stranicu. Saznajte više o našim radionicama kuhanja za djecu.",
  openGraph: {
    title: "Šarolika Kuhinja - Početna",
    description:
      "Dobrodošli na našu početnu stranicu. Saznajte više o našim radionicama kuhanja za djecu.",
    url: `${baseUrl}/`,
    images: [
      {
        url: `${baseUrl}/images/logo.png`,
        width: 800,
        height: 600,
        alt: "Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Šarolika Kuhinja - Početna",
    description:
      "Dobrodošli na našu početnu stranicu. Saznajte više o našim radionicama kuhanja za djecu.",
    image: `${baseUrl}/images/logo.png`,
  },
};

export default async function HomePage() {
  return (
    <main className="page">
      <Hero />
      <Marque
        textArray={[
          "Šarolika kuhinja",
          "Učenje od malih nogu",
          "Radionice za djecu",
          "Kreativno izražavanje",
          "Zdrava prehrana",
          "Kreativne radionice",
          "Kuhanje za djecu",
          "Zabava i učenje",
          "Slatko i slano",
        ]}
      />
      <WokrshopsSlider />
      <WhatWeTryToDo />
      <WorkshopParts />
      <OurTeam />
      <MealsWeMake />
      <Reviews />
      <MealsSlider />
      <Location />
      <PostsSlider />
    </main>
  );
}
