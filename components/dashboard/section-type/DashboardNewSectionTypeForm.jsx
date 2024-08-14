'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useImageUpload, useImageDelete } from '@/hooks/useImageUpload'
import Button from '@/components/Button'
import LoadingSpinner from '../LoadingSpinner'
import '@/styles/DashboardItem.scss'
import NextImage from 'next/image'
import { useRouter } from 'next/navigation'
import {
  createSectionType,
  updateSectionType,
} from '@/actions/SectionTypesActions'
import JSXContentRenderer from '@/components/JSXContentRender'
import { toast } from 'react-hot-toast'
import ToasterComponent from '../ToasterComponent'

export default function DashboardNewSectionTypeForm({ sectionType }) {
  const router = useRouter()
  const [previewFullScreen, setPreviewFullScreen] = useState(false)
  const [item, setItem] = useState({
    title: '',
    jsxContent: {
      type: 'section',
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '3rem 0',
        margin: '0 auto',
        width: '100%',
        gap: '1rem',
        '(max-width: 768px)': {
          gap: '1rem',
        },
      },
      children: [
        {
          type: 'div',
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
            width: '100%',
            height: 'auto',
          },
          children: [
            {
              type: 'h5',
              className: 'caveat',
              style: {
                fontFamily: "'Caveat', cursive",
                fontSize: '1.7rem',
                fontWeight: '600',
                color: '#000',
                marginBottom: '.5rem',
                color: '#405b62',
                lineHeight: '1.2',
                '(max-width: 1600px)': {
                  fontSize: '1.6rem',
                },
                '(max-width: 1300px)': {
                  fontSize: '1.4rem',
                },
              },
              data: {
                text: 'Subtitle Here',
                msg: 'Podnaslov',
              },
            },
            {
              type: 'h3',
              style: {
                marginBottom: '.5rem',
                fontSize: '2.3rem',
                lineHeight: '1.2',
                fontWeight: '600',
                '(max-width: 1600px)': {
                  fontSize: '2rem',
                },
                '(max-width: 1300px)': {
                  fontSize: '1.8rem',
                },
              },
              data: {
                text: 'Main Title Here',
                msg: 'Naslov',
              },
            },
            {
              type: 'content',
              style: {
                fontSize: '.9rem',
                lineHeight: '1.8',
                color: '#333',
                '(max-width: 768px)': {
                  fontSize: '.8rem',
                  lineHeight: '1.6',
                },
              },
              data: {
                text: `<div class="paragraph">
                          <p>The output created is in HTML5 and can include lists, tables, and other useful elements, depending on your configuration. The functionality of the editor can be extended through plugins and cu<strong>stomizations, or limited to suit y</strong>our use-case. TinyMCE can also be customized to look and feel like part of your application or webpage by customizing the user interface. TinyMCE can be integrated into a range of frameworks and Content Management Systems (CMSs), and can be either:</p>
                        </div>
                        <div class="ulist">
                          <ul>
                          <li>
                           <p>Loaded from the Tiny Cloud CDN (Content Delivery Network), which will ensure TinyMCE is always using the latest version.</p>
                          </li>
                          <li>
                           <p>Installed with a package manager (self-hosted).</p>
                          </li>
                          <li>
                            <p>Extracted from a .zip file (self-hosted).</p>
                          </li>
                        </ul>
                      </div>
                `,
                msg: 'Opis',
              },
            },
          ],
        },
        {
          type: 'div',
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            width: '100%',
            height: '32rem',
            '(max-width: 768px)': {
              height: '30rem',
              width: '100%',
            },
          },
          children: [
            {
              type: 'img',
              style: {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              },
              data: {
                src: 'placeholder-image.svg',
                alt: 'Example image',
                msg: 'Slika',
              },
            },
          ],
        },
      ],
    },
    image: '',
  })
  const [imageToDelete, setImageToDelete] = useState(null)

  useEffect(() => {
    if (sectionType) {
      setItem(sectionType)
    }
  }, [sectionType])

  const { uploadImages, uploadingImages } = useImageUpload()
  const { deleteImage } = useImageDelete()
  const inputRef = useRef(null)

  const handleUploadImages = async (e) => {
    const files = e.target.files

    if (item.image) {
      setImageToDelete(item.image)
    }

    uploadImages(files).then((urls) => {
      setItem({
        ...item,
        image: urls[0],
      })
    })
  }

  const markImageForDeletion = () => {
    setImageToDelete(item.image)
    setItem({
      ...item,
      image: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!sectionType?.id) {
      const res = await createSectionType(item)

      toast((t) => (
        <ToasterComponent
          title={'Dodavanje tipa sekcije: ' + item?.title}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={res?.message}
        />
      ))

      if (res?.ok) {
        setItem({
          title: '',
          jsxContent: [],
          image: '',
        })
        router.push('/dashboard/tipovi-sekcija')
      }
    } else {
      const res = await updateSectionType(item)

      toast((t) => (
        <ToasterComponent
          title={'Uređivanje tipa sekcije: ' + sectionType.title}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={res?.message}
        />
      ))

      if (res?.ok) {
        if (imageToDelete) {
          await deleteImage(imageToDelete)
        }
        router.push('/dashboard/tipovi-sekcija')
      } else {
        console.error('Error editing section type:', res?.message)
      }
    }
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
              uploadingImages ? (
                <LoadingSpinner />
              ) : sectionType?.id ? (
                'Uredi tip sekcije'
              ) : (
                'Dodaj tip sekcije'
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
          {' '}
          <JSXContentRenderer content={item.jsxContent} />{' '}
        </div>
      </section>
    </>
  )
}
