import Hero from "@/components/home/Hero";
import Marquee from "@/components/Marquee";

export default async function HomePage() {
  return (
    <main className="page">
      <Hero />
      <Marquee
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
    </main>
  );
}
