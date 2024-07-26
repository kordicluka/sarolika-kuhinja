// app/layout.js
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import Newsletter from '@/components/Newsletter'
import NewsletterPopUp from '@/components/NewsletterPopUp'

const inter = Inter({
  subsets: ['latin'],
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
})

export const metadata = {
  title: 'Šarolika Kuhinja - Radionice za djecu',
  description:
    'Radionice za djecu u kojima učimo o hrani i pripremamo zdrave obroke.',
  keywords:
    'radionice za djecu, zdrava prehrana, kuhanje za djecu, edukacija o hrani, Šarolika Kuhinja, dječje radionice, zdravi recepti, kulinarske radionice, dječje kuhanje, prehrana za djecu, kreativne radionice, zdravi obroci, nutricionizam za djecu, učenje kuhanja, djeca i prehrana, kulinarske vještine, hrana za djecu, radionice kuhanja, zdrav život za djecu, dječja edukacija, kulinarske aktivnosti, kuhanje za najmlađe, obiteljske radionice, zdravi snackovi, kulinarstvo za djecu, zabavne radionice, edukativne aktivnosti, priprema obroka, dječji obroci, zdrava kuhinja, učenje o hrani, prehrambene navike, razvoj kulinarskih vještina, kuharski tečajevi, zdrava hrana, edukacija kroz kuhanje, dječje aktivnosti, prehrana i zdravlje, kulinarski savjeti, kuhanje i zabava, edukacija djece, prehrambeni planovi, kreativnost u kuhinji, razvoj djece, zdravlje kroz hranu, kuharske radionice, obroci za djecu, zdravlje i prehrana, zabava za djecu',
  openGraph: {
    title: 'Šarolika Kuhinja - Radionice za djecu',
    description:
      'Radionice za djecu u kojima učimo o hrani i pripremamo zdrave obroke.',
    url: 'https://www.sarolika-kuhinja.com/',
    images: [
      {
        url: 'https://www.sarolika-kuhinja.com/images/logo.png',
        width: 800,
        height: 600,
        alt: 'Šarolika Kuhinja Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Šarolika Kuhinja - Radionice za djecu',
    description:
      'Radionice za djecu u kojima učimo o hrani i pripremamo zdrave obroke.',
    image: 'https://www.sarolika-kuhinja.com/images/logo.png',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="mstile" href="/mstile-150x150.png" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Newsletter />
        <Footer />
        <NewsletterPopUp />
      </body>
    </html>
  )
}
