"use client";
import React, { useState, useEffect, useRef } from "react";
import { useImageUpload, useImageDelete } from "@/hooks/useImageUpload";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import "@/styles/DashboardItem.scss";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import {
  useCreateSectionType,
  useUpdateSectionType,
} from "@/hooks/useSectionTypes";
import JSXContentRenderer from "./JSXContentRender";

export default function DashboardNewSectionTypeForm({ sectionType }) {
  const router = useRouter();
  const [previewFullScreen, setPreviewFullScreen] = useState(false);
  const [item, setItem] = useState({
    title: "",
    jsxContent: {
      type: "section",
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "3rem 0",
        margin: "0 auto",
        width: "100%",
        gap: "5%",
        "(max-width: 768px)": {
          flexDirection: "column",
          padding: "1rem 0",
        },
      },
      children: [
        {
          type: "div",
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "100%",
            width: "47.5%",
            "(max-width: 768px)": {
              width: "100%",
            },
          },
          children: [
            {
              type: "h3",
              style: {
                marginBottom: ".5rem",
                fontSize: "2.2rem",
                color: "black",
              },

              data: {
                text: "Subtitle Here",
              },
            },
            {
              type: "h1",
              style: {
                marginBottom: "1rem",
                fontSize: "4rem",
                color: "black",
              },
              data: {
                text: "Main Title Here",
              },
            },
            {
              type: "p",
              style: {
                marginBottom: "1rem",
                fontSize: ".95rem",
                lineHeight: "1.5",
                color: "black",
              },
              data: {
                text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              },
            },
          ],
        },
        {
          type: "div",
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            width: "47.5%",
            "(max-width: 768px)": {
              width: "100%",
            },
          },
          children: [
            {
              type: "img",
              style: {
                width: "100%",
                height: "auto",
                "(max-width: 768px)": {
                  width: "100%",
                },
              },
              data: {
                src: "/placeholder-image.svg",
                alt: "Example image",
              },
            },
          ],
        },
      ],
    },
    image: "",
  });
  const [imageToDelete, setImageToDelete] = useState(null);
  const {
    loading: loadingCreatingSectionType,
    create: createSectionType,
    error: errorCreatingSectionType,
  } = useCreateSectionType();
  const {
    loading: loadingUpdatingSectionType,
    error: errorUpdatingSectionType,
    updateSectionType,
  } = useUpdateSectionType();

  useEffect(() => {
    if (sectionType) {
      setItem(sectionType);
    }
  }, [sectionType]);

  const { uploadImages, uploadingImages } = useImageUpload();
  const { deleteImage } = useImageDelete();
  const inputRef = useRef(null);

  const handleUploadImages = async (e) => {
    const files = e.target.files;
    const imageKey = await uploadImages(files);

    setItem({
      ...item,
      image: imageKey,
    });
  };

  const markImageForDeletion = () => {
    setImageToDelete(item.image);
    setItem({
      ...item,
      image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(item.image);

    if (!sectionType?.id) {
      const res = await createSectionType(item);

      if (res?.ok) {
        setItem({
          title: "",
          jsxContent: [],
          image: "",
        });
        router.push("/dashboard/tipovi-sekcija");
      } else {
        alert("Error creating section type", res?.message);
      }
    } else {
      const res = await updateSectionType(item);

      if (res?.ok) {
        if (imageToDelete) {
          await deleteImage(imageToDelete);
        }
        router.push("/dashboard/tipovi-sekcija");
      } else {
        console.error("Error editing section type:", res?.message);
      }
    }
  };

  return (
    <>
      <form className="dashboard-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <h5>Osnovne informacije</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="title">Naslov</label>
            <input
              type="text"
              id="title"
              required
              placeholder="Unesite naslov"
              value={item.title}
              onChange={(e) =>
                setItem({
                  ...item,
                  title: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="form-row">
          <h5>Slika tipa sekcije</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item single-image">
            <label htmlFor="single-image">Slika tipa sekcije</label>
            <input
              type="file"
              id="single-image"
              onChange={handleUploadImages}
              ref={inputRef}
            />
          </div>
          {item.image && (
            <div className="form-row-item single-image">
              <div className="form-row-images">
                <div className="form-row-image">
                  <NextImage
                    src={`/uploads/${item.image}`}
                    alt="Slika tipa sekcije"
                    style={{ width: "100%" }}
                    fill="responsive"
                  />
                  <Button
                    className="delete-image-btn"
                    onClick={markImageForDeletion}
                    type="button"
                    label={
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
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {uploadingImages && (
            <div className="form-row-item floor-plan">
              <LoadingSpinner />
            </div>
          )}
        </div>

        <div className="form-row">
          <h5>Sadržaj tipa sekcije</h5>
        </div>

        <div className="form-row">
          <textarea
            id="jsxContent"
            rows="10"
            value={JSON.stringify(item.jsxContent, null, 2)}
            onChange={(e) =>
              setItem({
                ...item,
                jsxContent: JSON.parse(e.target.value),
              })
            }
          />
        </div>

        <div className="form-row">
          <Button
            type="submit"
            className="btn black submit"
            disabled={uploadingImages}
            label={
              uploadingImages ||
              loadingCreatingSectionType ||
              loadingUpdatingSectionType ? (
                <LoadingSpinner />
              ) : sectionType?.id ? (
                "Uredi tip sekcije"
              ) : (
                "Dodaj tip sekcije"
              )
            }
          />
        </div>
      </form>
      <section className="preview">
        <button
          onClick={() => setPreviewFullScreen(!previewFullScreen)}
          className="preview-fullscreen"
        >
          {!previewFullScreen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.4}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          )}
        </button>
        <h5 className="preview-header">Pretpregled</h5>
        <div className="preview-content">
          {" "}
          <JSXContentRenderer content={item.jsxContent} />{" "}
        </div>
      </section>
    </>
  );
}
