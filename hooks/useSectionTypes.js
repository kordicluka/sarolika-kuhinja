import { useState, useEffect } from "react";
import {
  createSectionType,
  updateSectionType,
  deleteSectionType,
  getSectionTypes as fetchSectionTypes,
  getSectionType as fetchSectionType,
} from "@/actions/SectionTypesActions";

const useFetch = (fetchFunction, args = [], defaultValue = null) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction(...args);
      if (response.ok) {
        setData(response.data || response.sectionType || response.sectionTypes);
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
    fetchData();
  }, args);

  return { data, loading, error, refetch: fetchData };
};

// Hook to get all section types
export const useSectionTypes = () => {
  return useFetch(fetchSectionTypes, [], []);
};

// Hook to get a single section type by ID
export const useSectionType = (id) => {
  return useFetch(fetchSectionType, [id]);
};

// Hook to create a new section type
export const useCreateSectionType = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
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
    setError(null);
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
    setError(null);
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
