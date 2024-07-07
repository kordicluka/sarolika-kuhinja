"use client";
import React from "react";
import { deleteMeal } from "@/actions/MealsActions";
import { toast } from "react-hot-toast";
const DeleteMealButton = ({ id, title }) => {
  const handleDelete = async () => {
    const res = await deleteMeal(id);

    toast((t) => (
      <ToasterComponent
        title={"Brisanje obroka: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));

    if (!res.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Izbrisi</button>;
};

export default DeleteMealButton;
