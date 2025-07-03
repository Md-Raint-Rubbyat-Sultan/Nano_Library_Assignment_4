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
import { EyeIcon, ReceiptCent, Trash2, UploadCloud } from "lucide-react";
import ViewDtailsButton from "../shared/ViewDtailsButton/ViewDtailsButton";

export default function BooksCard({ book }: { book: book }) {
  const { author, available, copies, description, genre, title, _id } = book;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
        <CardAction>
          <p
            className={cn(
              available ? "text-green-500" : "text-yellow-500",
              "font-bold"
            )}
          >
            {available ? "Available" : "Unavailable"}
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
          <span className="font-medium">Copies:</span> {copies}
        </p>
        {/* <p>
          <span className="font-medium">Get in stock:</span>{" "}
          {createdAt?.slice(0, 10)}
        </p> */}
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-4">
        <ViewDtailsButton _id={_id}>
          <EyeIcon /> Details
        </ViewDtailsButton>
        <Button className="t-2">
          <ReceiptCent /> Borrow
        </Button>
        <Button className="t-2">
          <UploadCloud /> Update
        </Button>
        <Button className="t-2">
          <Trash2 /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
