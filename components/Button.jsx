"use client";
import React from "react";

const Button = ({ onClick, type, label, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
