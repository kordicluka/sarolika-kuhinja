"use client";
import React from "react";
import "@/styles/PageTitle.scss";

const PageTitle = ({ title, description }) => {
  const addNewFunction = () => {
    console.log("Add new function");
  };

  const searchFunction = () => {
    console.log("Search function");
  };

  return (
    <section className="page-title">
      <div className="page-title-left">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="page-title-right">
        <button className="btn black" onClick={() => addNewFunction()}>
          Dodaj novi
        </button>
        <div className="search">
          <input
            type="text"
            placeholder="Pretraži..."
            onChange={() => searchFunction()}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
