import React from "react";
import "@/styles/WorkshopParts.scss";
import Link from "next/link";

export default function WorkshopParts() {
  return (
    <section className="workshop-parts">
      <h2>Kako izgledaju naše radionice?</h2>
      <Link href="/radionice" className="btn">
        Saznajte više
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </Link>

      <div className="workshop-parts-container">
        <div className="workshop-parts-line"></div>
        <div className="workshop-parts-circle-first"></div>
        <div className="workshop-parts-circle-last"></div>

        <div className="workshop-part workshop-part-1">
          <h5>01. Uvod u kuhanje</h5> <div className="circle"></div>
          <p>
            Radionica za djecu koja se prvi put susreću s kuhanjem. Učimo osnove
            kuhanja i pripreme hrane. Djeca će naučiti kako sigurno koristiti
            osnovne kuhinjske alate i razumeti osnovne tehnike kuhanja koje će
            ih osposobiti za daljnje korake u kulinarstvu.
          </p>
        </div>
        <div className="workshop-part workshop-part-2">
          <h5>02. Priprema sastojaka</h5> <div className="circle"></div>
          <p>
            Radionica za djecu koja su već kušala kuhanje. Učimo kako pripremiti
            sastojke za jelo. Fokus je na pravilnom pranju, rezanju i merenju
            sastojaka, što će pomoći djeci da bolje razumeju važnost preciznosti
            i organizacije u kuhinji.
          </p>
        </div>
        <div className="workshop-part workshop-part-3">
          <h5>03. Kuhanje jela</h5> <div className="circle"></div>
          <p>
            Radionica za djecu koja znaju pripremiti sastojke. Učimo kako
            pripremiti jelo. U ovoj fazi djeca će se upoznati sa različitim
            tehnikama kuhanja poput prženja, pečenja i kuhanja na pari, kako bi
            proširili svoje kulinarske veštine.
          </p>
        </div>
        <div className="workshop-part workshop-part-4">
          <h5>04. Edukacija</h5>
          <div className="circle"></div>
          <p>
            Radionica za djecu koja znaju kuhati. Učimo o zdravoj prehrani i
            prehrambenim navikama. Djeca će naučiti kako balansirati obroke,
            važnost unosa različitih grupa namirnica, te kako napraviti zdrave i
            ukusne obroke koji će ih osnažiti za dnevne aktivnosti.
          </p>
        </div>
      </div>
    </section>
  );
}
