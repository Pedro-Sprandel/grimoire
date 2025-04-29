export type Review = {
  rating: number;
  title: string;
  comment?: string;
  createdAt: string;
  bookId: string;
  userId: string | { _id: string; username: string };
};
