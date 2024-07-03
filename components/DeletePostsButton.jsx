"use client";
import React from "react";
import { deletePost } from "@/actions/PostsActions";

const DeletePostsButton = ({ id }) => {
  const handleDelete = async () => {
    const response = await deletePost(id);
    if (!response.ok) {
      alert("Failed to delete section type");
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeletePostsButton;
