import React from "react";
import NextImage from "next/image";
import limitTextChar from "@/utils/limitTextChar";
import "@/styles/ItemCard.scss";
import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";

export default function ItemCard({ item, link }) {
  return (
    <a href={link} className="item-card">
      <div className="item-card-image">
        <NextImage
          src={`/uploads/${item.image}`}
          alt={item.title}
          width={500}
          height={500}
        />
        <div className="arrow">
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
        </div>
      </div>
      <div className="item-card-info">
        <h6 className="item-card-info-title">{item.title}</h6>{" "}
        <h6 className="item-card-info-date">
          {formatDate(item.date) + " - " + formatTime(item.date) + " h"}
        </h6>
        <p className="item-card-info-desc">
          {limitTextChar(item.description, 100)}
        </p>
      </div>
    </a>
  );
}
