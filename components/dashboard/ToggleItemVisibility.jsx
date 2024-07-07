"use client";
import React from "react";
import { useTogglePostVisibility } from "@/hooks/usePosts";
import { useToggleMealVisibility } from "@/hooks/useMeals";
import { useToggleWorkshopVisibility } from "@/hooks/useWorkshops";
import { toast } from "react-hot-toast";
import ToasterComponent from "./ToasterComponent";

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
        const resPost = await togglePostVisibility(item.id);
        toast((t) => (
          <ToasterComponent
            title={item.title}
            t={t}
            state={resPost?.ok ? "success" : "error"}
            message={resPost?.message}
          />
        ));
        break;
      case "meal":
        const resMeal = await toggleMealVisibility(item.id);
        toast((t) => (
          <ToasterComponent
            title={item.title}
            t={t}
            state={resMeal?.ok ? "success" : "error"}
            message={resMeal?.message}
          />
        ));
        break;
      case "workshop":
        const resWorkshop = await toggleWorkshopVisibility(item.id);
        toast((t) => (
          <ToasterComponent
            title={item.title}
            t={t}
            state={resWorkshop?.ok ? "success" : "error"}
            message={resWorkshop?.message}
          />
        ));
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
