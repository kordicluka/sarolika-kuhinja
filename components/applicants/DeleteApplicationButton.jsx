"use client";
import { deleteApplication } from "@/actions/ApplicationActions";
import React, { useState } from "react";

export default function DeleteApplicationButton({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = async (id) => {
    setIsDeleting(true);

    const { message, ok } = await deleteApplication(id);

    if (!ok) {
      alert(message);
    }
  };

  return (
    <button onClick={() => deleteItem(id)} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "Obriši"}
    </button>
  );
}
