import { useState, useEffect } from "react";
import {
  createMeal,
  updateMeal,
  deleteMeal,
  getMeals as fetchMeals,
  getMeal as fetchMeal,
  toggleMealVisibility,
} from "@/actions/MealsActions";

// Custom hook to handle fetch operations
const useFetch = (fetchFunction, args = [], defaultValue = null) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseJsxContent = (item) => {
    if (item && item.Mealsections) {
      return {
        ...item,
        Mealsections: item.Mealsections.map((section) => ({
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
        const result = response.data || response.Meal || response.Meals;
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

// Hook to get all Meals
export const useMeals = () => {
  return useFetch(fetchMeals, [], []);
};

// Hook to get a single Meal by ID
export const useMeal = (id) => {
  return useFetch(fetchMeal, [id]);
};

// Hook to create a new Meal
export const useCreateMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createMeal(data);
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

// Hook to update an existing Meal
export const useUpdateMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateMeal(data);
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

// Hook to delete a Meal
export const useDeleteMeal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteMeal(id);
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

export const useToggleMealVisibility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleVisibility = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await toggleMealVisibility(id);
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
