'use client'
import React, { useState } from 'react'
import { createApplication } from '@/actions/ApplicationActions'
import '@/styles/ApplicateToWorkshopForm.scss'
import NextImage from 'next/image'

const ApplicateToWorkshopForm = ({ workshop }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    childName: '',
    telephone: '',
    email: '',
    childAlergies: '',
    additionalNotes: '',
    photoPermission: true,
  })

  const handleToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      photoPermission: !prevData.photoPermission,
    }))
  }

  const id = workshop.id

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { ...formData, workshopId: id }

    try {
      const response = await createApplication(data)
      if (response.ok) {
        alert('Uspješno ste prijavili dijete na radionicu!')
        setFormData({
          name: '',
          surname: '',
          childName: '',
          telephone: '',
          email: '',
          childAlergies: '',
          additionalNotes: '',
          photoPermission: false,
        })
      } else {
        alert('Došlo je do greške prilikom prijave djeteta na radionicu.')
      }
    } catch (err) {
      console.error(err)
      alert('Došlo je do greške prilikom prijave djeteta na radionicu.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="applicate-to-workshop-form">
      <div className="form-container">
        <h3>Prijavite dijete na radionicu</h3>
        <p>
          Ukoliko želite prijaviti dijete na radionicu, molimo Vas da popunite
          ovaj obrazac. <br />
          <br /> Cijena radionice je 40€ po djetetu.
        </p>
        <div className="applicate-to-workshop-form-input">
          <label>
            Vaše ime
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Unesite Vaše ime"
              required
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Vaše prezime
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Unesite Vaše prezime"
              required
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Ime djeteta
            <input
              type="text"
              name="childName"
              value={formData.childName}
              onChange={handleChange}
              placeholder="Unesite ime djeteta"
              required
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Broj telefona
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Unesite broj telefona"
              required
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Unesite e-mail adresu"
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Djetetove alergije
            <textarea
              name="childAlergies"
              value={formData.childAlergies}
              onChange={handleChange}
              placeholder="Unesite djetetove alergije"
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Dodatne napomene
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Unesite dodatne napomene"
            />
          </label>
        </div>
        <div className="applicate-to-workshop-form-input">
          <label>
            Dozvola za fotografiranje
            <button
              type="button"
              className={`toggle-button ${
                formData.photoPermission ? '' : 'hidden'
              }`}
              onClick={handleToggle}
            >
              <div className="toggle-button-dot"></div>
            </button>
          </label>
        </div>

        <button type="submit" className="btn primary">
          Pošalji prijavu
        </button>
      </div>

      <NextImage
        src={workshop.image}
        alt="Workshop image"
        height={1500}
        width={1500}
        priority
      />
    </form>
  )
}

export default ApplicateToWorkshopForm
