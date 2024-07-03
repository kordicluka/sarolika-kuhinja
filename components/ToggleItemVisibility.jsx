"use client";
import React from "react";
import { useTogglePostVisibility } from "@/hooks/usePosts";

export default function ToggleItemVisibility({ type, item }) {
  const {
    toggleVisibility,
    loadingPostVisibility: loading,
    errorPostVisibility: error,
  } = useTogglePostVisibility();

  const handleToggle = async () => {
    switch (type) {
      case "post":
        await toggleVisibility(item.id);
        break;
      case "meal":
        break;
      case "workshop":
        break;
      default:
        break;
    }
  };

  return (
    <button
      className={`toggle-button ${item.isVisible ? "" : "hidden"}`}
      disabled={loading}
      onClick={handleToggle}
    >
      <div className="toggle-button-dot"></div>
    </button>
  );
}
