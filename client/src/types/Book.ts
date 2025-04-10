export type Book = {
  _id: string;
  title: string;
  authors: string[];
  isbn: string;
  publisher: string;
  publishedYear: number;
  genres: string[];
  pageCount: number | null;
  language: string;
  description: string;
  coverImageUrl: string;
  createdAt: string;
  __v: number;
};