"use client";
import React from "react";
import { toast } from "react-hot-toast";

const ToasterComponent = ({ title, message, t, state }) => {
  return (
    <button className="toast-jsx-container" onClick={() => toast.dismiss(t.id)}>
      <div className="toast-jsx-container-header">
        <div
          className="toast-jsx-container-header-icon"
          style={
            state === "error"
              ? { backgroundColor: "red" }
              : state === "success"
              ? { backgroundColor: "green" }
              : null
          }
        ></div>
        <div className="toast-jsx-container-header-title">{title}</div>
        <div className="toast-jsx-container-header-close">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <span className="toast-jsx-container-msg">{message}</span>
    </button>
  );
};

export default ToasterComponent;
