"use client";
import React, { useState } from "react";

export default function page() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.set("file", file);

    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const response = await result.json();

      if (response.status === 200) {
        console.log(response.body.message);
      } else if (response.status === 400) {
        alert(response.body.message);
        console.error(response.body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
}
