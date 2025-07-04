import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { book } from "@/interfaces/book.interface";
import { Link } from "react-router";
import CommonActionButtons from "../shared/CommonActionButtons/CommonActionButtons";

export default function BooksTable({ books }: { books: book[] }) {
  return (
    <Table>
      <TableCaption className="mb-4">
        A list of books.{" "}
        <Link to={"/books"} className="font-medium text-green-500">
          Show more
        </Link>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">isbn</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Genre</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Copies</TableHead>
          <TableHead>Available</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map(
          (
            { _id, isbn, title, author, genre, description, copies, available },
            idx: number
          ) => (
            <TableRow key={idx}>
              <TableCell>{isbn}</TableCell>
              <TableCell className="font-medium">{title}</TableCell>
              <TableCell>{author}</TableCell>
              <TableCell>{genre}</TableCell>
              <TableCell>
                {`${description?.slice(0, 20)}...` || "None"}
              </TableCell>
              <TableCell>{copies}</TableCell>
              <TableCell>{available ? "Available" : "Unavailable"}</TableCell>
              <TableCell>
                {/* Need to use functiolality here */}
                <CommonActionButtons
                  _id={_id}
                  available={available}
                  style="gap-2"
                />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
