import { useState, useEffect } from "react";
import {
  createPost,
  updatePost,
  deletePost,
  getPosts as fetchPosts,
  getPost as fetchPost,
  togglePostVisibility,
} from "@/actions/PostsActions";

// Custom hook to handle fetch operations
const useFetch = (fetchFunction, args = [], defaultValue = null) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const parseJsxContent = (item) => {
    if (item && item.postSections) {
      return {
        ...item,
        postSections: item.postSections.map((section) => ({
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
        const result = response.data || response.post || response.posts;
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

// Hook to get all posts
export const usePosts = () => {
  return useFetch(fetchPosts, [], []);
};

// Hook to get a single post by ID
export const usePost = (id) => {
  return useFetch(fetchPost, [id]);
};

// Hook to create a new post
export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createPost(data);
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

// Hook to update an existing post
export const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (data) => {
    setLoading(true);
    setError(null);

    console.log(data);
    try {
      const response = await updatePost(data);
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

// Hook to delete a post
export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deletePost(id);
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

export const useTogglePostVisibility = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleVisibility = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await togglePostVisibility(id);
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
