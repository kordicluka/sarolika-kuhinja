"use client";
import React from "react";
import { deleteMeal } from "@/actions/MealsActions";

const DeleteMealButton = ({ id }) => {
  const handleDelete = async () => {
    const response = await deleteMeal(id);
    if (!response.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteMealButton;
