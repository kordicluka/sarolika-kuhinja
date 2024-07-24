import { useState } from 'react'

export const useImageUpload = () => {
  const [uploadingImages, setUploadingImages] = useState(false)

  const uploadImages = async (files) => {
    setUploadingImages(true)

    let urls = []

    // Create a new FormData object
    const formData = new FormData()
    // Append each file to the FormData object
    Array.from(files).forEach((file) => {
      formData.append('files', file)
    })

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData, // Use FormData as the body
      })

      const data = await response.json()

      if (data.status === 400) {
        console.error('Error uploading images:', data.message)
      } else {
        urls = data.body.urls
      }
    } catch (error) {
      console.error('Error uploading images:', error)
    } finally {
      console.log('Images uploaded:', urls)
      setUploadingImages(false)
      return urls
    }
  }

  return { uploadImages, uploadingImages }
}

export const useImageDelete = () => {
  const deleteImageHandler = async (imageKey, inputRef) => {}

  return { deleteImage: deleteImageHandler }
}
