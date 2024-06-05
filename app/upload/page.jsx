"use client";
import React, { useState } from "react";

export default function page() {
  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const response = await result.json();

      if (response.status === 200) {
        console.log(response.body.message);
        setFileNames(response.body.keys);
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
        <input
          type="file"
          onChange={(e) => setFiles(Array.from(e.target.files))}
          multiple
        />
        <button type="submit">Upload multiple</button>

        {fileNames.length > 0 && (
          <div>
            <h2>Uploaded files:</h2>
            <ul>
              {fileNames.map((fileName) => (
                <li key={fileName}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </main>
  );
}
