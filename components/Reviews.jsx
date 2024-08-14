import React from 'react'
import { Star } from './Star'
import '@/styles/Reviews.scss'
import { Caveat } from 'next/font/google'
import { formatDate } from '@/utils/formatDate'

const caveat = Caveat({
  display: 'swap',
  weights: [400, 700],
  subsets: ['latin'],
})

export const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Ivana Horvat',
      review:
        'Moje dijete je oduševljeno radionicama kuhanja! Naučilo je toliko novih vještina, a posebno su uživali u pripremi zdravih obroka. Instruktori su fantastični i imaju puno strpljenja. Preporučujem svima!',
      rating: 5,
      date: '2023-05-15',
    },
    {
      id: 2,
      name: 'Marko Kovač',
      review:
        'Radionice su izvrsne! Moj sin sada zna pripremiti jednostavna, ali ukusna jela. Posebno mu se sviđa što uči o zdravoj prehrani. Instruktori su vrlo profesionalni i pristupačni.',
      rating: 4,
      date: '2023-06-20',
    },
    {
      id: 3,
      name: 'Ana Babić',
      review:
        'Predivno iskustvo za djecu! Moja kćerka se svaki put veseli radionicama. Naučila je osnovne tehnike kuhanja i stekla samopouzdanje u kuhinji. Instruktori su izvrsni i jako ljubazni.',
      rating: 5,
      date: '2023-04-10',
    },
    {
      id: 4,
      name: 'Petar Perić',
      review:
        'Vrlo korisne radionice! Djeca uče kuhati, ali i razvijaju ljubav prema zdravoj hrani. Moja kćer sada obožava kuhati s nama kod kuće. Hvala instruktorima na svemu!',
      rating: 4,
      date: '2023-07-01',
    },
    {
      id: 1,
      name: 'Ivana Horvat',
      review:
        'Moje dijete je oduševljeno radionicama kuhanja! Naučilo je toliko novih vještina, a posebno su uživali u pripremi zdravih obroka. Instruktori su fantastični i imaju puno strpljenja. Preporučujem svima!',
      rating: 5,
      date: '2023-05-15',
    },
    {
      id: 2,
      name: 'Marko Kovač',
      review:
        'Radionice su izvrsne! Moj sin sada zna pripremiti jednostavna, ali ukusna jela. Posebno mu se sviđa što uči o zdravoj prehrani. Instruktori su vrlo profesionalni i pristupačni.',
      rating: 4,
      date: '2023-06-20',
    },
    {
      id: 3,
      name: 'Ana Babić',
      review:
        'Predivno iskustvo za djecu! Moja kćerka se svaki put veseli radionicama. Naučila je osnovne tehnike kuhanja i stekla samopouzdanje u kuhinji. Instruktori su izvrsni i jako ljubazni.',
      rating: 5,
      date: '2023-04-10',
    },
    {
      id: 4,
      name: 'Petar Perić',
      review:
        'Vrlo korisne radionice! Djeca uče kuhati, ali i razvijaju ljubav prema zdravoj hrani. Moja kćer sada obožava kuhati s nama kod kuće. Hvala instruktorima na svemu!',
      rating: 4,
      date: '2023-07-01',
    },
    {
      id: 1,
      name: 'Ivana Horvat',
      review:
        'Moje dijete je oduševljeno radionicama kuhanja! Naučilo je toliko novih vještina, a posebno su uživali u pripremi zdravih obroka. Instruktori su fantastični i imaju puno strpljenja. Preporučujem svima!',
      rating: 5,
      date: '2023-05-15',
    },
    {
      id: 2,
      name: 'Marko Kovač',
      review:
        'Radionice su izvrsne! Moj sin sada zna pripremiti jednostavna, ali ukusna jela. Posebno mu se sviđa što uči o zdravoj prehrani. Instruktori su vrlo profesionalni i pristupačni.',
      rating: 4,
      date: '2023-06-20',
    },
    {
      id: 3,
      name: 'Ana Babić',
      review:
        'Predivno iskustvo za djecu! Moja kćerka se svaki put veseli radionicama. Naučila je osnovne tehnike kuhanja i stekla samopouzdanje u kuhinji. Instruktori su izvrsni i jako ljubazni.',
      rating: 5,
      date: '2023-04-10',
    },
    {
      id: 4,
      name: 'Petar Perić',
      review:
        'Vrlo korisne radionice! Djeca uče kuhati, ali i razvijaju ljubav prema zdravoj hrani. Moja kćer sada obožava kuhati s nama kod kuće. Hvala instruktorima na svemu!',
      rating: 4,
      date: '2023-07-01',
    },
  ]

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Star key={i} fill={i <= rating ? '#FFD700' : '#C0C0C0'} />)
    }
    return stars
  }

  return (
    <section className="reviews">
      <h3 className={caveat.className}>Pogledajte recenzije!</h3>
      <h2>Što ostali roditelji kažu o nama?</h2>
      <p>
        U ovoj fazi djeca će aktivno sudjelovati u kuhanju jednostavnih jela.
        Naučit će osnovne tehnike kuhanja poput miješanja, sjeckanja, pirjanja i
        pečenja.
      </p>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <h6>{review.name}</h6>
            <div className="stars">{renderStars(review.rating)}</div>
            <p>{review.review}</p>
            <div className="date">{formatDate(review.date)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
