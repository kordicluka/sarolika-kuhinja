"use client";
import React from "react";
import { deleteSectionType } from "@/actions/SectionTypesActions";
import { toast } from "react-hot-toast";
import ToasterComponent from "../ToasterComponent";

const DeleteSectionTypeButton = ({ id, title }) => {
  const handleDelete = async () => {
    const res = await deleteSectionType(id);

    toast((t) => (
      <ToasterComponent
        title={"Brisanje radionice: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));

    if (!res.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Obriši</button>;
};

export default DeleteSectionTypeButton;
