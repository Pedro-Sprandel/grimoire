import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import axiosInstance from "../axiosInstance";
import { Review } from "../types/Review";
import { useAuth } from "./useAuth";

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

export type ReviewWithUsername = Omit<Review, "userId"> & {
  userId: { username: "string" };
};

const calculateAverageRating = (reviews: ReviewWithUsername[]) => {
  const averageRating =
    reviews.reduce((total, item) => total + item.rating, 0) / reviews.length;

  return averageRating;
};

interface UseReviewsState {
  currentUserReview: ReviewWithUsername | null;
  reviews: ReviewWithUsername[];
  loading: boolean;
  error: string | null;
  averageRating: number | null;
}

export const useReviews = (bookId?: string) => {
  const { user } = useAuth();
  const [state, setState] = useState<UseReviewsState>({
    currentUserReview: null,
    reviews: [],
    loading: !!bookId,
    error: null,
    averageRating: null
  });

  const fetchReviews = useCallback(async () => {
    if (!bookId) {
      setState((prev) =>
        prev.reviews.length === 0
          ? prev
          : {
            ...prev,
            currentUserReview: null,
            reviews: [],
            averageRating: null
          }
      );

      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const response = await axiosInstance.get(`/books/${bookId}/reviews`, {
        params: { userId: user?.id }
      });
      const averageRating = calculateAverageRating(response.data.reviews);
      setState({
        currentUserReview: response.data.userReview,
        reviews: response.data.reviews,
        loading: false,
        error: null,
        averageRating
      });
    } catch (err) {
      const error = axios.isAxiosError(err)
        ? `Failed: ${err.response?.data?.message || err.message}`
        : "Get all reviews failed";
      setState((prev) =>
        prev.error === error ? prev : { ...prev, error, loading: false }
      );
    }
  }, [bookId, user]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchReviews();

    return () => abortController.abort();
  }, [bookId, fetchReviews]);

  return useMemo(
    () => ({
      ...state,
      refetch: fetchReviews
    }),
    [state, fetchReviews]
  );
};
