import Hero from "@/components/home/Hero";
import { ItemsSlider } from "@/components/ItemsSlider";
import Marque from "@/components/Marque";
import WokrshopsSlider from "@/components/WokrshopsSlider";

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
    </main>
  );
}
