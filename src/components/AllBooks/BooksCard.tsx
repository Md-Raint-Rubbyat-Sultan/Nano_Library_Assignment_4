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
import CommonActionButtons from "../shared/CommonActionButtons/CommonActionButtons";

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
      </CardContent>
      <CardFooter>
        <CommonActionButtons
          _id={_id}
          available={available}
          style="flex-wrap gap-4"
        />
      </CardFooter>
    </Card>
  );
}
