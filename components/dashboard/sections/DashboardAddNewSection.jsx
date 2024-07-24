import React, { useState, useEffect } from 'react'
import { getSectionTypes } from '@/actions/SectionTypesActions'
import LoadingSpinner from '../LoadingSpinner'
import NextImage from 'next/image'
import { useImageUpload } from '@/hooks/useImageUpload'
import { produce } from 'immer'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill with no SSR to avoid server-side issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function DashboardAddNewSection({
  item,
  active,
  setActive,
  setItem,
  setImagesToDelete,
  section,
  setSection,
  sectionWithoutUpdates,
  setSectionWithoutUpdates,
}) {
  // const { data: sectionTypes, loading: loadingSectionTypes } =
  //   useSectionTypes();

  const [sectionTypes, setSectionTypes] = useState([])
  const [loadingSectionTypes, setLoadingSectionTypes] = useState(true)

  useEffect(() => {
    getSectionTypes().then((data) => {
      setSectionTypes(data.sectionTypes)
      setLoadingSectionTypes(false)
    })
  }, [])

  const [choosenSectionType, setChoosenSectionType] = useState(null)
  const { uploadImages, uploadingImages } = useImageUpload()

  const addSectionToItemJSXContent = (section) => {
    if (!section.title) {
      alert('Naslov sekcije je obavezan')
      return
    }

    if (Object.keys(section.jsxContent).length === 0) {
      alert('Morate napraviti sekciju')
      return
    }

    if (item.sections.some((s) => s.index === section.index)) {
      alert(
        'Redni broj sekcije koji ste unijeli već postoji, ali će sekcija biti dodana svejedno. Imajte na umu da se može dogoditi da kada sekcije imaju isti redni broj može doći do neporedanog prikaza na stranici.'
      )
    }

    setItem(
      produce((draft) => {
        draft.sections.push(section)
      })
    )
    setSection({
      title: '',
      jsxContent: {},
      index: 0,
    })
    setChoosenSectionType(null)
    setActive(false)
    setSectionWithoutUpdates({
      title: '',
      jsxContent: {},
      index: 0,
    })
  }

  const handleUploadImages = async (e, path) => {
    const files = e.target.files
    // uploadImages(files).then((urls) => {
    //   setItem({
    //     ...item,
    //     image: urls[0],
    //   })
    // })

    const urls = await uploadImages(files)

    const imageKey = urls[0]

    const oldKey = path.reduce((acc, index, i) => {
      if (i === path.length - 1) {
        return acc.children[index].data.src
      } else {
        return acc.children[index]
      }
    }, section.jsxContent)

    if (oldKey !== 'placeholder-image.svg') {
      setImagesToDelete((old) => [...old, oldKey])
    }

    setSection(
      produce((draft) => {
        let current = draft.jsxContent
        path.forEach((index, i) => {
          if (i === path.length - 1) {
            current.children[index].data.src = imageKey
          } else {
            current = current.children[index]
          }
        })
      })
    )
  }

  const handleInputChange = (e, path) => {
    const value = e.target.value
    setSection(
      produce((draft) => {
        let current = draft.jsxContent
        path.forEach((index, i) => {
          if (i === path.length - 1) {
            current.children[index].data.text = value
          } else {
            current = current.children[index]
          }
        })
      })
    )
  }

  const handleContentChange = (value, path) => {
    setSection(
      produce((draft) => {
        let current = draft.jsxContent
        path.forEach((index, i) => {
          if (i === path.length - 1) {
            current.children[index].data.text = value
          } else {
            current = current.children[index]
          }
        })
      })
    )
  }

  const inputTypeTextElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span']
  const textareaTypeElements = ['p']

  const generateSectionJSXInputs = (jsxContent, path = []) => {
    if (!jsxContent) return null

    return jsxContent.children?.map((element, index) => {
      const currentPath = [...path, index.toString()]

      if (element.type === 'img') {
        return (
          <>
            <div className="form-row">
              <h5>{element.data.msg}</h5>
            </div>
            <div className="form-row">
              <div className="form-row-item single-image">
                <label htmlFor={currentPath.join('-')}>
                  {element.data.msg}
                </label>
                <input
                  type="file"
                  id={currentPath.join('-')}
                  onChange={(e) => handleUploadImages(e, currentPath)}
                />
              </div>
              {element.data.src && (
                <div className="form-row-item single-image">
                  <div className="form-row-images">
                    <div className="form-row-image">
                      <NextImage
                        src={element.data.src}
                        alt={element.data.alt}
                        style={{ width: '100%' }}
                        fill="responsive"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      } else if (element.data && inputTypeTextElements.includes(element.type)) {
        return (
          <div className="form-row" key={currentPath.join('-')}>
            <div className="form-row-item">
              <label htmlFor={currentPath.join('-')}>{element.data.msg}</label>
              <input
                type="text"
                id={currentPath.join('-')}
                value={element.data.text || ''}
                onChange={(e) => handleInputChange(e, currentPath)}
              />
            </div>
          </div>
        )
      } else if (element.data && textareaTypeElements.includes(element.type)) {
        return (
          <div className="form-row" key={currentPath.join('-')}>
            <div className="form-row-item">
              <label htmlFor={currentPath.join('-')}>{element.data.msg}</label>
              <textarea
                id={currentPath.join('-')}
                value={element.data.text || ''}
                onChange={(e) => handleInputChange(e, currentPath)}
              />
            </div>
          </div>
        )
      } else if (element.type === 'content') {
        return (
          <div className="form-row" key={currentPath.join('-')}>
            <div className="form-row-item">
              <label htmlFor={currentPath.join('-')}>{element.data.msg}</label>
              <ReactQuill
                value={element.data.text || ''}
                style={{ width: '100%' }}
                onChange={(content) =>
                  handleContentChange(content, currentPath)
                }
                modules={{
                  toolbar: [
                    [{ header: '1' }, { header: '2' }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['link', 'image'],
                    ['clean'],
                  ],
                }}
              />
            </div>
          </div>
        )
      } else if (element.children) {
        return generateSectionJSXInputs(element, currentPath)
      } else {
        return null
      }
    })
  }

  return (
    <>
      <div
        className={
          active
            ? 'dashboard-add-new-section active'
            : 'dashboard-add-new-section'
        }
      >
        <div className="form-row">
          <h5>Dodajte sekciju</h5>
        </div>
        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="sections">Naslov</label>
            <input
              type="text"
              value={section.title}
              onChange={(e) =>
                setSection({ ...section, title: e.target.value })
              }
              placeholder="Unesite naslov sekcije"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="sections">Redni broj sekcije</label>
            <input
              type="number"
              value={section.index}
              onChange={(e) =>
                setSection({ ...section, index: parseInt(e.target.value) })
              }
              placeholder="Unesite redni broj sekcije"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-row-item">
            <label htmlFor="sections">Izaberite tip sekcije</label>
            <div className="section-types">
              {loadingSectionTypes ? (
                <LoadingSpinner />
              ) : (
                sectionTypes?.map((sectionType) => (
                  <button
                    key={sectionType.id}
                    onClick={() => {
                      if (sectionType.id === choosenSectionType?.id) {
                        setChoosenSectionType(null)
                        setSection({ ...section, jsxContent: {} })
                      } else {
                        setChoosenSectionType(sectionType)
                        setSection({
                          ...section,
                          jsxContent: sectionType.jsxContent,
                        })
                      }
                    }}
                    className={`section-type ${
                      choosenSectionType?.id === sectionType.id ? 'active' : ''
                    }`}
                    type="button"
                  >
                    <NextImage
                      src={sectionType.image}
                      width={100}
                      height={100}
                      alt="Slika tipa sekcije"
                    />
                    <span>{sectionType.title}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {generateSectionJSXInputs(section.jsxContent)}

        <div className="dashboard-add-new-section-bottom">
          <button
            className="btn"
            onClick={() => {
              setActive(false)
              setSection({
                title: '',
                jsxContent: {},
                index: 0,
              })
              if (sectionWithoutUpdates.title !== '') {
                setItem(
                  produce((draft) => {
                    draft.sections.push(sectionWithoutUpdates)
                  })
                )
              }
              setSectionWithoutUpdates({
                title: '',
                jsxContent: {},
                index: 0,
              })
            }}
            type="button"
          >
            Odustani
          </button>
          <button
            className="btn"
            onClick={() => addSectionToItemJSXContent(section)}
            type="button"
            disabled={uploadingImages}
          >
            {uploadingImages ? (
              <LoadingSpinner />
            ) : sectionWithoutUpdates.title ? (
              'Spremi promjene'
            ) : (
              'Dodaj sekciju'
            )}
          </button>
        </div>
      </div>
    </>
  )
}
