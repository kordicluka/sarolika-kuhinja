// /hooks/useWorkshops.js

import { useState, useEffect, useContext } from "react";
import { useContextProvider } from "@/context/context";
import {
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
  getWorkshops,
  getWorkshop,
  toggleWorkshopVisibility,
  getWorkshopBySlug,
} from "@/actions/WorkshopsActions";

const useWorkshops = () => {
  const { workshops, setWorkshops } = useContextProvider();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkshops = async () => {
    setLoading(true);
    try {
      const response = await getWorkshops();
      if (response.ok) {
        setWorkshops(response.workshop);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Failed to fetch workshops.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkshop = async (id) => {
    setLoading(true);
    try {
      const response = await getWorkshop(id);
      if (response.ok) {
        return response.workshop;
      } else {
        setError(response.message);
        return null;
      }
    } catch (error) {
      setError("Failed to fetch workshop.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkshopBySlug = async (slug) => {
    setLoading(true);
    try {
      const response = await getWorkshopBySlug(slug);
      if (response.ok) {
        return response.workshop;
      } else {
        setError(response.message);
        return null;
      }
    } catch (error) {
      setError("Failed to fetch workshop by slug.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createNewWorkshop = async (data) => {
    setLoading(true);
    try {
      const response = await createWorkshop(data);
      if (response.ok) {
        await fetchWorkshops();
      } else {
        setError(response.message);
      }
      return response;
    } catch (error) {
      setError("Failed to create workshop.");
      return { message: "Failed to create workshop.", ok: false };
    } finally {
      setLoading(false);
    }
  };

  const updateExistingWorkshop = async (data) => {
    setLoading(true);
    try {
      const response = await updateWorkshop(data);
      if (response.ok) {
        await fetchWorkshops();
      } else {
        setError(response.message);
      }
      return response;
    } catch (error) {
      setError("Failed to update workshop.");
      return { message: "Failed to update workshop.", ok: false };
    } finally {
      setLoading(false);
    }
  };

  const deleteExistingWorkshop = async (id) => {
    setLoading(true);
    try {
      const response = await deleteWorkshop(id);
      if (response.ok) {
        await fetchWorkshops();
      } else {
        setError(response.message);
      }
      return response;
    } catch (error) {
      setError("Failed to delete workshop.");
      return { message: "Failed to delete workshop.", ok: false };
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id) => {
    setLoading(true);
    try {
      const response = await toggleWorkshopVisibility(id);
      if (response.ok) {
        await fetchWorkshops();
      } else {
        setError(response.message);
      }
      return response;
    } catch (error) {
      setError("Failed to toggle workshop visibility.");
      return { message: "Failed to toggle workshop visibility.", ok: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return {
    workshops,
    loading,
    error,
    fetchWorkshops,
    fetchWorkshop,
    fetchWorkshopBySlug,
    createNewWorkshop,
    updateExistingWorkshop,
    deleteExistingWorkshop,
    toggleVisibility,
  };
};

export default useWorkshops;
