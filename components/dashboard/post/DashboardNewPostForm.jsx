'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useImageUpload, useImageDelete } from '@/hooks/useImageUpload'
import Button from '@/components/Button'
import LoadingSpinner from '../LoadingSpinner'
import '@/styles/DashboardItem.scss'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import JSXContentRenderer from '../../JSXContentRender'
import DashboardAddNewSection from '../sections/DashboardAddNewSection'
import { toast } from 'react-hot-toast'
import ToasterComponent from '../ToasterComponent'
import { createPost, updatePost } from '@/actions/PostsActions'

export default function DashboardNewPostForm({ post }) {
  const router = useRouter()
  const [addNewSectionActive, setAddNewSectionActive] = useState(false)
  const [previewFullScreen, setPreviewFullScreen] = useState(false)
  const [imagesToDelete, setImagesToDelete] = useState([])
  const [section, setSection] = useState({
    title: '',
    jsxContent: {},
    index: 0,
  })
  const [sectionWithoutUpdates, setSectionWithoutUpdates] = useState({
    title: '',
    jsxContent: {},
    index: 0,
  })

  const [item, setItem] = useState({
    title: '',
    description: '',
    image: '',
    isVisible: true,
    sections: [],
  })

  useEffect(() => {
    if (post) {
      setItem({
        ...post,
        sections: post.sections || [], // Ensure sections is always an array
      })
    }
  }, [post])

  const { uploadImages, uploadingImages } = useImageUpload()
  const { deleteImage } = useImageDelete()
  const inputRef = useRef(null)

  const handleUploadImages = async (e) => {
    const files = e.target.files

    // If there is an image already, delete it
    if (item.image) {
      setImagesToDelete((old) => [...old, item.image])
    }

    uploadImages(files).then((urls) => {
      setItem({
        ...item,
        image: urls[0],
      })
    })
  }

  const markImageForDeletion = () => {
    setImagesToDelete((old) => [...old, item.image])
    setItem({
      ...item,
      image: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!post?.id) {
      const res = await createPost(item)

      toast((t) => (
        <ToasterComponent
          title={'Dodavanje objave: ' + item.title}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={res?.message}
        />
      ))

      if (res?.ok) {
        deleteImagesThatAreMarkedForDeletion()
        router.push('/dashboard/blog')
      }
    } else {
      if (sectionWithoutUpdates.title !== '') {
        setItem({
          ...item,
          sections: [...item.sections, sectionWithoutUpdates],
        })

        setSectionWithoutUpdates({
          title: '',
          jsxContent: {},
          index: 0,
        })
      }

      const res = await updatePost(item)

      toast((t) => (
        <ToasterComponent
          title={'Uređivanje objave: ' + item.title}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={res?.message}
        />
      ))

      if (res?.ok) {
        deleteImagesThatAreMarkedForDeletion()
        router.push('/dashboard/blog')
      } else {
        console.error('Error editing post:', res?.message)
      }
    }
  }

  const deleteImagesThatAreMarkedForDeletion = async () => {
    // check if the image is in the item somewhere
    // if it isn't, delete it

    let allImages = item.sections.reduce((acc, section) => {
      recursivlyIterateOverJSXContent(section.jsxContent, (content) => {
        if (content.type === 'img') {
          acc.push(content.data.src)
        }
      })

      return acc
    }, [])

    allImages.push(item.image)

    console.log('allImages:', allImages)

    if (imagesToDelete.length > 0) {
      imagesToDelete.forEach(async (image) => {
        if (!allImages.includes(image) && image !== 'placeholder-image.svg') {
          console.log('deleting image:', image)
          const res = await deleteImage(image)
          console.log('res:', res)
        }
      })
    }
  }

  const recursivlyIterateOverJSXContent = (content, callback, imageKey) => {
    if (content.type === 'img' && content.data.src === imageKey) {
      callback(content)
    }

    if (content.children) {
      content.children.forEach((child) => {
        recursivlyIterateOverJSXContent(child, callback, imageKey)
      })
    }

    callback(content)
  }

  const deleteSection = (s) => {
    item.sections.forEach((section) => {
      if (section === s) {
        recursivlyIterateOverJSXContent(section.jsxContent, (content) => {
          if (content.type === 'img') {
            setImagesToDelete((old) => [...old, content.data.src])
          }
        })
      }
    }, [])

    setItem({
      ...item,
      sections: item.sections.filter((section) => section !== s),
    })
  }

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
          <div className="form-row-item">
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              required
              placeholder="Unesite opis"
              value={item.description}
              onChange={(e) =>
                setItem({
                  ...item,
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-row">
          <h5>Sekcije</h5>
        </div>
        {Array.isArray(item.sections) && item.sections.length > 0 ? (
          <>
            <div className="form-row">
              <div className="form-row-item">
                <label htmlFor="sections">Poredaj sekcije</label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-row-sections">
                {item.sections.map((section, index) => (
                  <div key={index} className="form-row-section">
                    <button className="drag-button">
                      {section.index + 1 + '.'}
                    </button>
                    <p className="form-section-title">{section.title}</p>
                    <div className="form-row-section-actions">
                      <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>

                      <div className="dropdowns">
                        <button
                          className="btn"
                          onClick={() => {
                            setAddNewSectionActive(true)
                            setSection(section)
                            setSectionWithoutUpdates(section)
                            setItem({
                              ...item,
                              sections: item.sections.filter(
                                (s) => s !== section
                              ),
                            })
                          }}
                          type="button"
                        >
                          Uredi
                        </button>

                        <button
                          className="btn"
                          onClick={() => {
                            deleteSection(section)
                          }}
                          type="button"
                        >
                          Izbriši
                        </button>
                      </div>
                    </div>
                  </div>
                ))}{' '}
              </div>
            </div>
          </>
        ) : (
          <div className="form-row">
            <div className="form-row-item">
              <p className="form-row-item-msg">
                Dodajte sekcije kako biste ih mogli poredati.
              </p>
            </div>
          </div>
        )}
        <div className="form-row">
          <button
            className="btn black add-section-btn"
            onClick={() => setAddNewSectionActive(true)}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span>Dodaj novu sekciju</span>
          </button>
        </div>{' '}
        <div className="form-row">
          <h5>Slika objave</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item single-image">
            <label htmlFor="single-image">Slika objave</label>
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
                    src={item.image}
                    alt="Slika tipa sekcije"
                    style={{ width: '100%' }}
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
        <DashboardAddNewSection
          item={item}
          setItem={setItem}
          active={addNewSectionActive}
          setActive={setAddNewSectionActive}
          imagesToDelete={imagesToDelete}
          setImagesToDelete={setImagesToDelete}
          section={section}
          setSection={setSection}
          setSectionWithoutUpdates={setSectionWithoutUpdates}
          sectionWithoutUpdates={sectionWithoutUpdates}
        />
        <div className="form-row">
          <Button
            type="submit"
            className="btn black submit"
            disabled={uploadingImages}
            label={
              uploadingImages ? (
                <LoadingSpinner />
              ) : item?.id ? (
                'Uredi objavu'
              ) : (
                'Dodaj objavu'
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
              strokeWidth={1.1}
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
          {Array.isArray(item.sections) &&
            item.sections.length > 0 &&
            item.sections
              .filter((section) => section.title !== '')
              .sort((a, b) => a.index - b.index)
              .map((section, index) => (
                <>
                  <JSXContentRenderer
                    key={index}
                    content={section.jsxContent}
                  />
                </>
              ))}
          {section.jsxContent && (
            <JSXContentRenderer content={section.jsxContent} />
          )}
        </div>
      </section>
    </>
  )
}
