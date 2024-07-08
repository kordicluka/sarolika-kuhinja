"use client";
import React from "react";
import { deleteMeal } from "@/actions/MealsActions";
import { toast } from "react-hot-toast";
import ToasterComponent from "../ToasterComponent";
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
  };

  return <button onClick={handleDelete}>Obriši</button>;
};

export default DeleteMealButton;
