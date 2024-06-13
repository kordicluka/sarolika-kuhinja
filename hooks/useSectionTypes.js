import { useState, useEffect } from "react";
import {
  createSectionType,
  updateSectionType,
  deleteSectionType,
  getSectionTypes as fetchSectionTypes,
  getSectionType as fetchSectionType,
} from "@/actions/SectionTypesActions";

// Hook to get all section types
export const useSectionTypes = () => {
  const [sectionTypes, setSectionTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await fetchSectionTypes();
      if (response.ok) {
        setSectionTypes(response.sectionTypes);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return { sectionTypes, loading, error, getAll };
};

// Hook to get a single section type by ID
export const useSectionType = (id) => {
  const [sectionType, setSectionType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSectionType = async () => {
    setLoading(true);
    try {
      const response = await fetchSectionType(id);
      if (response.ok) {
        setSectionType(response.sectionType);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSectionType();
  }, [id]);

  return { sectionType, loading, error, getSectionType };
};

// Hook to create a new section type
export const useCreateSectionType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    try {
      const response = await createSectionType(data);
      if (!response.ok) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { message: err.message, ok: false };
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
};

// Hook to update an existing section type
export const useUpdateSectionType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    setLoading(true);
    try {
      const response = await updateSectionType(data);
      if (!response.ok) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { message: err.message, ok: false };
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
};

// Hook to delete a section type
export const useDeleteSectionType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    try {
      const response = await deleteSectionType(id);
      if (!response.ok) {
        setError(response.message);
      }
      return response;
    } catch (err) {
      setError(err.message);
      return { message: err.message, ok: false };
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
};
