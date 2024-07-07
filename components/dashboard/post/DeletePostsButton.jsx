"use client";
import React from "react";
import { deletePost } from "@/actions/PostsActions";
import { toast } from "react-hot-toast";
import ToasterComponent from "../ToasterComponent";

const DeletePostsButton = ({ id, title }) => {
  const handleDelete = async () => {
    const res = await deletePost(id);

    toast((t) => (
      <ToasterComponent
        title={"Brisanje objave: " + title}
        t={t}
        state={res?.ok ? "success" : "error"}
        message={res?.message}
      />
    ));

    if (!res.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeletePostsButton;
