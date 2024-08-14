'use client'
import { useRef, useState, useEffect } from 'react'
import { useImageUpload, useImageDelete } from '@/hooks/useImageUpload'
import Button from '@/components/Button'
import LoadingSpinner from '../LoadingSpinner'
import '@/styles/DashboardItem.scss'
import NextImage from 'next/image'
import { createUser, editUser } from '@/actions/UserActions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import ToasterComponent from '../ToasterComponent'

export default function DashboardNewUserForm({ user }) {
  const router = useRouter()
  const [item, setItem] = useState({
    name: '',
    email: '',
    password: '',
    image: '',
  })
  const [imageToDelete, setImageToDelete] = useState(null)

  useEffect(() => {
    if (user) {
      setItem(user)
    }
  }, [user])

  const { uploadImages, uploadingImages } = useImageUpload()
  const { deleteImage } = useImageDelete()
  const inputRef = useRef(null)

  const handleUploadImages = async (e) => {
    const files = e.target.files
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

    if (!user?.id) {
      const res = await createUser(item)

      let state = res?.ok ? 'success' : 'error'
      let message = res?.message
      let title = 'Dodavanje korisnika: ' + item.name

      toast((t) => (
        <ToasterComponent title={title} t={t} state={state} message={message} />
      ))

      state = res?.ok ? 'success' : 'error'
      message = res?.message

      if (res?.ok) {
        setItem({
          name: '',
          email: '',
          password: '',
          image: '',
        })

        router.push('/dashboard/korisnici')
      }
    } else {
      const res = await editUser(user.id, item)

      toast((t) => (
        <ToasterComponent
          title={'Uređivanje korisnika: ' + item.name}
          t={t}
          state={res?.ok ? 'success' : 'error'}
          message={res?.message}
        />
      ))

      if (res?.ok) {
        if (imageToDelete) {
          await deleteImage(imageToDelete)
        }
        router.push('/dashboard/korisnici')
      }
    }
  }

  return (
    <form className="dashboard-item-form full-width" onSubmit={handleSubmit}>
      <div className="form-row">
        <h5>Osnovne informacije</h5>
      </div>
      <div className="form-row">
        <div className="form-row-item">
          <label htmlFor="name">Ime i prezime</label>
          <input
            type="text"
            id="name"
            required
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
            required
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
        <div className="form-row-item">
          <label htmlFor="password">Lozinka</label>
          <input
            type="password"
            id="password"
            placeholder="Unesite lozinku"
            value={item.password}
            onChange={(e) =>
              setItem({
                ...item,
                password: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="form-row">
        <h5>Slika korisnika</h5>
      </div>
      <div className="form-row">
        <div className="form-row-item single-image">
          <label htmlFor="single-image">Slika korisnika</label>
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
                  alt="Slika korisnika"
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
        <Button
          type="submit"
          className="btn black full-width submit"
          disabled={uploadingImages}
          label={
            uploadingImages ? (
              <LoadingSpinner />
            ) : user?.id ? (
              'Uredi korisnika'
            ) : (
              'Dodaj korisnika'
            )
          }
        />
      </div>
    </form>
  )
}
