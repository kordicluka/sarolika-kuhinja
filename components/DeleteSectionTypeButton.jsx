"use client";
import React from "react";
import { deleteSectionType } from "@/actions/SectionTypesActions";

const DeleteSectionTypeButton = ({ id }) => {
  const handleDelete = async () => {
    const response = await deleteSectionType(id);
    if (!response.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteSectionTypeButton;
