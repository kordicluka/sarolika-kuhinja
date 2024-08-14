import OurTeam from "@/components/OurTeam";
import { PageTitle } from "@/components/PageTitle";
import React from "react";
import "@/styles/AboutUsPage.scss";
import WhatWeTryToDo from "@/components/home/WhatWeTryToDo";
import { baseUrl } from "@/utils/baseUrl";

export const metadata = {
  title: "Šarolika Kuhinja - O nama",
  description:
    "Saznajte više o našem timu i ciljevima koje pokušavamo ostvariti.",
  openGraph: {
    title: "Šarolika Kuhinja - O nama",
    description:
      "Saznajte više o našem timu i ciljevima koje pokušavamo ostvariti.",
    url: `${baseUrl}/o-nama`,
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
    title: "Šarolika Kuhinja - O nama",
    description:
      "Saznajte više o našem timu i ciljevima koje pokušavamo ostvariti.",
    image: `${baseUrl}/images/logo.png`,
  },
};

export default function AboutUsPage() {
  return (
    <main className="page about-us-page">
      <PageTitle
        title="O nama"
        shortDesc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto autem voluptas quas atque numquam, omnis aliquam praesentium aliquid cum esse harum distinctio. Eaque distinctio reiciendis illo temporibus, blanditiis dolore maiores."
      />
      <OurTeam />
      <WhatWeTryToDo />
    </main>
  );
}
