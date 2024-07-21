import { useState } from "react";

export const useImageUpload = () => {
  const [uploadingImages, setUploadingImages] = useState(false);

  const uploadImages = async (files) => {
    setUploadingImages(true);
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const response = await res.json();
    setUploadingImages(false);

    return response.body.keys[0];
  };

  return { uploadImages, uploadingImages };
};

export const useImageDelete = () => {
  const deleteImage = async (imageKey, inputRef) => {
    const res = await fetch(`/api/upload/${imageKey}`, {
      method: "DELETE",
    });

    // Clear the input field
    if (res.ok && inputRef?.current) {
      inputRef.current.value = "";
    }

    return res.ok;
  };

  return { deleteImage };
};
