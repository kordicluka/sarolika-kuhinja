"use client";
import React from "react";
import { useTogglePostVisibility } from "@/hooks/usePosts";
import { useToggleMealVisibility } from "@/hooks/useMeals";
import { useToggleWorkshopVisibility } from "@/hooks/useWorkshops";

export default function ToggleItemVisibility({ type, item }) {
  const {
    toggleVisibility: togglePostVisibility,
    loadingPostVisibility,
    errorPostVisibility,
  } = useTogglePostVisibility();

  const {
    toggleVisibility: toggleMealVisibility,
    loadingMealVisibility,
    errorMealVisibility,
  } = useToggleMealVisibility();

  const {
    toggleVisibility: toggleWorkshopVisibility,
    loadingWorkshopVisibility,
    errorWorkshopVisibility,
  } = useToggleWorkshopVisibility();

  const handleToggle = async () => {
    switch (type) {
      case "post":
        await togglePostVisibility(item.id);
        break;
      case "meal":
        await toggleMealVisibility(item.id);
        break;
      case "workshop":
        await toggleWorkshopVisibility(item.id);
        break;
      default:
        break;
    }
  };

  return (
    <button
      className={`toggle-button ${item.isVisible ? "" : "hidden"}`}
      disabled={
        type === "post"
          ? loadingPostVisibility
          : type === "meal"
          ? loadingMealVisibility
          : type === "workshop"
          ? loadingWorkshopVisibility
          : false
      }
      onClick={handleToggle}
    >
      <div className="toggle-button-dot"></div>
    </button>
  );
}
