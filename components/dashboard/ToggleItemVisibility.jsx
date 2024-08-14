"use client";
import React from "react";
import { toast } from "react-hot-toast";
import ToasterComponent from "./ToasterComponent";
import { toggleMealVisibility } from "@/actions/MealsActions";
import { toggleWorkshopVisibility } from "@/actions/WorkshopsActions";
import { togglePostVisibility } from "@/actions/PostsActions";

export default function ToggleItemVisibility({ type, item }) {
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
      onClick={handleToggle}
    >
      <div className="toggle-button-dot"></div>
    </button>
  );
}
