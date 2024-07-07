"use client";
import React from "react";
import { deleteWorkshop } from "@/actions/WorkshopsActions";
import { toast } from "react-hot-toast";
import ToasterComponent from "../ToasterComponent";

const DeleteWorkshopsButton = ({ id, title }) => {
  const handleDelete = async () => {
    const res = await deleteWorkshop(id);

    toast((t) => (
      <ToasterComponent
        title={"Brisanje radionice: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));

    if (!res.ok) {
      alert("Failed to delete workshop");
    }
  };

  return <button onClick={handleDelete}>Obriši</button>;
};

export default DeleteWorkshopsButton;
