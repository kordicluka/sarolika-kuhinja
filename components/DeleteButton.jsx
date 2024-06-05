"use client";
import React from "react";

export default function DeleteButton({ url, method }) {
  const deleteFunction = (url, method) => {
    fetch(`${url}`, {
      method: method,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          fetchUsers();
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return <button onClick={() => deleteFunction(url, method)}>Obriši</button>;
}
