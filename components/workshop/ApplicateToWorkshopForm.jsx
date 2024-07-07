"use client";
import React, { useState } from "react";
import { createApplication } from "@/actions/ApplicationActions";

const ApplicateToWorkshopForm = ({ workshop }) => {
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

  const id = workshop.id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = { ...formData, workshopId: id };

    try {
      const response = await createApplication(data);
      if (response.ok) {
        setSuccess("Application submitted successfully!");
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
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An error occurred while submitting the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply to Workshop</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Child Name:
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Telephone:
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Child Allergies:
          <textarea
            name="childAlergies"
            value={formData.childAlergies}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Additional Notes:
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Photo Permission:
          <input
            type="checkbox"
            name="photoPermission"
            checked={formData.photoPermission}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
};

export default ApplicateToWorkshopForm;
