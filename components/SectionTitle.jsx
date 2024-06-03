import React from "react";

export default function SectionTitle({
  title,
  subtitle,
  description,
  aligned,
}) {
  return (
    <div className="section-title">
      <h4>{subtitle}</h4>
      <h2>{title}</h2>
    </div>
  );
}
