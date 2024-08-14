"use client";
import { deleteApplication } from "@/actions/ApplicationActions";
import React from "react";
import { toast } from "react-hot-toast";
import ToasterComponent from "../dashboard/ToasterComponent";

export default function DeleteApplicationButton({ id, title }) {
  const deleteItem = async (id) => {
    const res = await deleteApplication(id);
    toast((t) => (
      <ToasterComponent
        title={"Brisanje prijave: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));
  };

  return <button onClick={() => deleteItem(id)}>Obriši</button>;
}
