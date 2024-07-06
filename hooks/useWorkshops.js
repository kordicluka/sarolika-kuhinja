import { useState, useEffect } from "react";
import {
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshops as fetchWorkshops,
  getWorkshop as fetchWorkshop,
  toggleWorkshopVisibility,
} from "@/actions/WorkshopsActions";

// Custom hook to handle fetch operations
const useFetch = (fetchFunction, args = [], defaultValue = null) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseJsxContent = (item) => {
    if (item && item.workshopSections) {
      return {
        ...item,
        workshopSections: item.workshopSections.map((section) => ({
          ...section,
          images: JSON.parse(section.images),
          jsxContent: JSON.parse(section.jsxContent),
        })),
      };
    }
    return item;
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction(...args);
      if (response.ok) {
        const result = response.data || response.workshop || response.workshops;
        if (Array.isArray(result)) {
          setData(result.map(parseJsxContent));
        } else {
          setData(parseJsxContent(result));
        }
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

// Hook to get all workshops
export const useWorkshops = () => {
  return useFetch(fetchWorkshops, [], []);
};

// Hook to get a single workshop by ID
export const useWorkshop = (id) => {
  return useFetch(fetchWorkshop, [id]);
};

// Hook to create a new workshop
export const useCreateWorkshop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createWorkshop(data);
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

// Hook to update an existing workshop
export const useUpdateWorkshop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    setLoading(true);
    setError(null);

    console.log(data);
    try {
      const response = await updateWorkshop(data);
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

// Hook to delete a workshop
export const useDeleteWorkshop = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteWorkshop(id);
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

export const useToggleWorkshopVisibility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleVisibility = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await toggleWorkshopVisibility(id);
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

  return { toggleVisibility, loading, error };
};
