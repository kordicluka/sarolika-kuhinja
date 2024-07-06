"use client";
import React from "react";
import { deleteWorkshop } from "@/actions/WorkshopsActions";

const DeleteWorkshopsButton = ({ id }) => {
  const handleDelete = async () => {
    const response = await deleteWorkshop(id);
    if (!response.ok) {
      alert("Failed to delete workshop");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteWorkshopsButton;
