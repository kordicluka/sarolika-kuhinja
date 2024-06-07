"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";

export default function SignUp() {
  const [item, setItem] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const [uploadingImages, setUploadingImages] = useState(false);

  const uploadImages = async (e) => {
    setUploadingImages(true);

    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const images = await res.json();
    setItem({
      ...item,
      image: images[0],
    });

    setUploadingImages(false);
  };

  const deleteImage = async (image) => {
    const res = await fetch("/api/upload", {
      method: "DELETE",
      body: JSON.stringify({ image }),
    });

    const images = await res.json();
    setItem({
      ...item,
      image: images[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    const data = await res.json();

    if (data.ok) {
      setItem({
        name: "",
        email: "",
        password: "",
        image: "",
      });
    }
  };

  return (
    <>
      <div className="active-item-hero">
        <h4>{item.name ? item.name : "Naslov"}</h4>

        {item.image > 0 ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        )}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <h5>Osnovne informacije</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="name">Naslov</label>
            <input
              type="text"
              id="name"
              placeholder="Unesite ime i prezime"
              value={item.name}
              onChange={(e) =>
                setItem({
                  ...item,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="form-row-item">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              placeholder="Unesite e-mail"
              value={item.email}
              onChange={(e) =>
                setItem({
                  ...item,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="form-row">
          <h5>Slike Novosti</h5>
        </div>

        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="images">Dodaj slike</label>
            <input type="file" id="images" onChange={uploadImages} multiple />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row-images">
            <div className="form-row-image">
              <img src={item.image} alt={item.image} />
              <button
                type="button"
                className="delete-image-btn"
                onClick={() => deleteImage(item.image)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <button
            type="submit"
            className="btn black submit"
            disabled={uploadingImages}
          >
            {uploadingImages ? (
              <LoadingSpinner />
            ) : item.id ? (
              "Uredi korisnika"
            ) : (
              "Dodaj korisnika"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
