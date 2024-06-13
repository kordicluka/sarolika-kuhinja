import { useState, useEffect } from "react";
import {
  createSection,
  updateSection,
  deleteSection,
  getSections as fetchSections,
  getSection as fetchSection,
} from "@/actions/SectionActions";

// Hook to get all sections
export const useSections = (filter = {}) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAll = async () => {
    setLoading(true);
    try {
      const response = await fetchSections(filter);
      if (response.ok) {
        setSections(response.sections);
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
  }, [filter]);

  return { sections, loading, error, getAll };
};

// Hook to get a single section by ID
export const useSection = (id) => {
  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSection = async () => {
    setLoading(true);
    try {
      const response = await fetchSection(id);
      if (response.ok) {
        setSection(response.section);
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
    getSection();
  }, [id]);

  return { section, loading, error, getSection };
};

// Hook to create a new section
export const useCreateSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    try {
      const response = await createSection(data);
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

// Hook to update an existing section
export const useUpdateSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    setLoading(true);
    try {
      const response = await updateSection(data);
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

// Hook to delete a section
export const useDeleteSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    try {
      const response = await deleteSection(id);
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
