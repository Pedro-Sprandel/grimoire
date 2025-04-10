import { Book } from "../types/Book";
import { useImageLoader } from "../hooks/useImageLoader";
import { useNavigate } from "react-router-dom";

type BookCardProps = {
  book: Book;
};

const BookCard: React.FC<BookCardProps> = (props) => {
  const { book } = props;
  const { isLoading, imageSrc } = useImageLoader(book.coverImageUrl);
  const navigate = useNavigate();

  const onClickBookCard = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div key={book._id} onClick={onClickBookCard} className="cursor-pointer w-[256px] bg-gray-300 rounded flex flex-col items-center justify-between">
      {isLoading && (
        <div>Loading...</div>
      )}
      <img
        src={imageSrc || book.coverImageUrl}
        alt={book.title}
        className="w-[256px] h-[256px] object-contain"
      />
      {!isLoading && (
        <div className="p-2 flex flex-col items-start w-full">
          <h2 className="font-bold w-full truncate">{book.title}</h2>
          <p className="">{book.authors[0]}</p>
        </div>
      )}
    </div>
  );
};

export default BookCard;