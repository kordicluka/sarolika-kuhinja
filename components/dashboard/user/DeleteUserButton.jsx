"use client";
import { deleteUser } from "@/actions/UserActions";
import React from "react";
import { toast } from "react-hot-toast";
import ToasterComponent from "../ToasterComponent";

export default function DeleteUserButton({ id, title }) {
  const deleteItem = async (id) => {
    const res = await deleteUser(id);

    toast((t) => (
      <ToasterComponent
        title={"Brisanje korisnika: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));

    if (!res.ok) {
      alert(res.message);
    }
  };

  return <button onClick={() => deleteItem(id)}>Obriši</button>;
}
