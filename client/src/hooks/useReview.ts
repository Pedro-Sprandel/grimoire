import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { Review } from "../types/Review";

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

type ReviewWithUsername = Omit<Review, "userId"> & {
  userId: { username: "string" };
};

export const useReviews = (bookId: string) => {
  const [reviews, setReviews] = useState<ReviewWithUsername[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/books/${bookId}/reviews`);
      setReviews(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(`Get all reviews failed: ${err.response.data.message}`);
      } else {
        setError("Get all reviews failed");
      }
    } finally {
      setLoading(false);
    }
  }, [bookId]);

  useEffect(() => {
    fetchReviews();
  }, [bookId, fetchReviews]);

  return { reviews, loading, error, refetch: fetchReviews };
};
