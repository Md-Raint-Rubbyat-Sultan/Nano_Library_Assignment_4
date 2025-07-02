import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { book } from "@/interfaces/book.interface";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ReceiptCent, Trash2, UploadCloud } from "lucide-react";

export default function BooksCard({ book }: { book: book }) {
  console.log(book);
  const {
    author,
    available,
    copies,
    createdAt,
    description,
    genre,
    isbn,
    title,
    _id,
  } = book;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <p
            className={cn(
              available ? "text-green-500" : "text-yellow-500",
              "font-bold"
            )}
          >
            {available ? "Available" : "Out of Stock"}
          </p>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          <span className="font-medium">Author:</span> {author}
        </p>
        <p>
          <span className="font-medium">Genre:</span> {genre}
        </p>
        <p>
          <span className="font-medium">Isbn:</span> {isbn}
        </p>
        <p>
          <span className="font-medium">Copies:</span> {copies}
        </p>
        <p>
          <span className="font-medium">Get in stock:</span>{" "}
          {createdAt?.slice(0, 10)}
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button>
          <ReceiptCent /> Borrow
        </Button>
        <Button>
          <UploadCloud /> Update
        </Button>
        <Button>
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}
