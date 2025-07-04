import BorrowABookButton from "@/components/BorrowABookButton/BorrowABookButton";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import UpdateABookButton from "@/components/UpdateABookButton/UpdateABookButton";
import type { book } from "@/interfaces/book.interface";
import { useGetSingleBookQuery } from "@/redux/api/basiapi";
import { ReceiptCent, Trash, UploadCloud } from "lucide-react";
import { useParams } from "react-router";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id as string);

  if (isLoading) return <Loader />;
  if (!data)
    return (
      <div className="text-3xl text-green-500 font-medium">No Book Found!</div>
    );
  const { data: bookData }: { data: book } = data;

  const {
    _id,
    title,
    author,
    genre,
    copies,
    isbn,
    createdAt,
    description,
    available,
  } = bookData;

  return (
    <section className="space-y-8">
      <div className="text-center my-4 md:my-8 space-y-4">
        <h2 className="text-3xl md:text-4xl text-green-500">{title}</h2>
        <h3 className="text-2xl md:text-3xl">{author}</h3>
      </div>
      <div>
        <p>
          <span className="font-medium">Genre </span>
          {genre}
        </p>
        <p>
          <span className="font-medium">ISBN </span>
          {isbn}
        </p>
        <p>
          <span className="font-medium">Available Copies: </span>
          {copies} {available ? "Available" : "Unavailable"}
        </p>
        <p>
          <span className="font-medium">Book Added To List At: </span>
          {createdAt?.slice(0, 10)}
        </p>
        <article>
          <span className="font-medium">Description:</span> {description}
        </article>
      </div>
      <div className="flex flex-wrap justify-start items-center-safe gap-4">
        <BorrowABookButton _id={_id} available={!available}>
          <ReceiptCent /> Borrow
        </BorrowABookButton>
        <UpdateABookButton _id={_id}>
          <UploadCloud /> Update
        </UpdateABookButton>
        <Button variant={"outline"} className="text-green-500">
          <Trash />
        </Button>
      </div>
    </section>
  );
}
