import { Inter } from "next/font/google";
import { Caveat } from "next/font/google";
import "@/styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
});

const caveat = Caveat({
  subsets: ["latin"],
  weights: [400],
});

export const metadata = {
  title: "Šarolika Kuhinja - Radionice za djecu",
  description:
    "Radionice za djecu u kojima učimo o hrani i pripremamo zdrave obroke.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          type="image/png"
          sizes="16x16"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/android-chrome-256x256.png"
          type="image/png"
          sizes="256x256"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="mstile" href="/mstile-150x150.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
