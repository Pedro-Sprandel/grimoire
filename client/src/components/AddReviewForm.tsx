import { useForm, Controller } from "react-hook-form";
import ReviewStars from "./ReviewStars";
import { useSubmitReview } from "../hooks/useReview";

interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
}

interface AddReviewFormProps {
  bookId: string;
  onCancel: () => void;
  onSubmit: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ bookId, onCancel, onSubmit }) => {
  const { submitReview, loading } = useSubmitReview();
  const { handleSubmit, control, register, reset } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 0,
      comment: ""
    }
  });

  const submit = async (data: ReviewFormData) => {
    await submitReview(bookId, data.rating, data.title, data.comment);
    onSubmit();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-4xl w-full bg-gray-300 shadow-md rounded-lg p-6"
    >

      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <ReviewStars
            rating={field.value}
            onRatingChange={field.onChange}
          />
        )}
      />

      <input
        {...register("title", { required: "Title is required" })}
        className="w-full mt-4 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter the title of your review"
      />

      <textarea
        {...register("comment", { required: "Comment is required" })}
        className="w-full resize-none mt-4 p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Write your review here..."
      ></textarea>

      <div className="flex gap-4">
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

    </form>
  );
};

export default AddReviewForm;