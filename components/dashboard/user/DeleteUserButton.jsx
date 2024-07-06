"use client";
import { deleteUser } from "@/actions/UserActions";
import React, { useState } from "react";

export default function DeleteUserButton({ id }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteItem = async (id) => {
    setIsDeleting(true);

    const { message, ok } = await deleteUser(id);

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
