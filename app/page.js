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

export default async function HomePage() {
  return (
    <main className="page">
      <Hero />
      <Marque
        textArray={[
          "Šarolika kuhinja",
          "Učenje od malih nogu",
          "Radionice za djecu",
          "Kreativno izrfl13exažavanje",
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
      <PostsSlider />
      <Reviews />
    </main>
  );
}
