import { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";

export const useSubmitReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (
    bookId: string,
    rating: number,
    title: string,
    comment?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/books/${bookId}/reviews`, {
        rating,
        title,
        comment
      });

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading, error };
};
