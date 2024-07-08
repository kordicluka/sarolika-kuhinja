"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useImageUpload, useImageDelete } from "@/hooks/useImageUpload";
import Button from "@/components/Button";
import LoadingSpinner from "../dashboard/LoadingSpinner";
import "@/styles/DashboardItem.scss";
import {
  createApplication,
  updateApplication,
} from "@/actions/ApplicationActions";
import { toast } from "react-hot-toast";
import ToasterComponent from "../dashboard/ToasterComponent";

export default function DashboardNewApplicantForm({ application, workshopID }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    childName: "",
    telephone: "",
    email: "",
    childAlergies: "",
    additionalNotes: "",
    photoPermission: false,
  });

  const [imageToDelete, setImageToDelete] = useState(null);

  useEffect(() => {
    if (application) {
      setFormData(application);
    }
  }, [application]);

  const { uploadingImages } = useImageUpload();
  const { deleteImage } = useImageDelete();
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!application?.id) {
      const res = await createApplication(formData);

      toast((t) => (
        <ToasterComponent
          title={"Dodavanje prijave: " + formData.name}
          t={t}
          state={res?.ok ? "success" : "error"}
          message={res?.message}
        />
      ));

      if (res?.ok) {
        setFormData({
          name: "",
          surname: "",
          childName: "",
          telephone: "",
          email: "",
          childAlergies: "",
          additionalNotes: "",
          photoPermission: false,
        });
        router.push("/dashboard/radionice/" + workshopID + "/prijave");
      }
    } else {
      const res = await updateApplication({ id: application.id, ...formData });

      toast((t) => (
        <ToasterComponent
          title={"Uređivanje prijave: " + formData.name}
          t={t}
          state={res?.ok ? "success" : "error"}
          message={res?.message}
        />
      ));

      if (res?.ok) {
        if (imageToDelete) {
          await deleteImage(imageToDelete);
        }
        router.push("/dashboard/radionice/" + workshopID + "/prijave");
      } else {
        console.error("Error editing application:", res?.message);
      }
    }
  };

  return (
    <form className="dashboard-item-form full-width" onSubmit={handleSubmit}>
      <div className="form-row">
        <h5>Osnovne informacije</h5>
      </div>
      <div className="form-row">
        <div className="form-row-item">
          <label htmlFor="name">Ime</label>
          <input
            type="text"
            id="name"
            required
            placeholder="Unesite ime"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="surname">Prezime</label>
          <input
            type="text"
            id="surname"
            required
            placeholder="Unesite prezime"
            value={formData.surname}
            onChange={(e) =>
              setFormData({
                ...formData,
                surname: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="childName">Ime djeteta</label>
          <input
            type="text"
            id="childName"
            required
            placeholder="Unesite ime djeteta"
            value={formData.childName}
            onChange={(e) =>
              setFormData({
                ...formData,
                childName: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="telephone">Telefon</label>
          <input
            type="tel"
            id="telephone"
            required
            placeholder="Unesite telefon"
            value={formData.telephone}
            onChange={(e) =>
              setFormData({
                ...formData,
                telephone: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="Unesite e-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="form-row">
        <h5>Dodatne informacije</h5>
      </div>
      <div className="form-row">
        <div className="form-row-item">
          <label htmlFor="childAlergies">Alergije djeteta</label>
          <textarea
            id="childAlergies"
            placeholder="Unesite alergije djeteta"
            value={formData.childAlergies}
            onChange={(e) =>
              setFormData({
                ...formData,
                childAlergies: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="additionalNotes">Dodatne napomene</label>
          <textarea
            id="additionalNotes"
            placeholder="Unesite dodatne napomene"
            value={formData.additionalNotes}
            onChange={(e) =>
              setFormData({
                ...formData,
                additionalNotes: e.target.value,
              })
            }
          />
        </div>
        <div className="form-row-item">
          <label htmlFor="photoPermission">Dozvola za fotografiranje</label>
          <input
            type="checkbox"
            id="photoPermission"
            checked={formData.photoPermission}
            onChange={(e) =>
              setFormData({
                ...formData,
                photoPermission: e.target.checked,
              })
            }
          />
        </div>
      </div>

      <div className="form-row">
        <Button
          type="submit"
          className="btn black full-width submit"
          disabled={uploadingImages}
          label={
            uploadingImages ? (
              <LoadingSpinner />
            ) : application?.id ? (
              "Uredi prijavu"
            ) : (
              "Dodaj prijavu"
            )
          }
        />
      </div>
    </form>
  );
}
