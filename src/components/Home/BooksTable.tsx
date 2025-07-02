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
import { Button } from "../ui/button";
import { EyeIcon, ReceiptCent, Trash, UploadCloud } from "lucide-react";
import { Link } from "react-router";

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
            { isbn, title, author, genre, description, copies, available },
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
              <TableCell>{available ? "Available" : "Not Available"}</TableCell>
              <TableCell>
                {/* Need to use functiolality here */}
                <div className="space-x-2">
                  <Button variant={"outline"} className="text-green-500">
                    <EyeIcon /> Details
                  </Button>
                  <Button
                    variant={"outline"}
                    className="text-green-500"
                    disabled={!available}
                  >
                    <ReceiptCent /> Borrow
                  </Button>
                  <Button variant={"outline"} className="text-green-500">
                    <UploadCloud /> Update
                  </Button>
                  <Button variant={"outline"} className="text-green-500">
                    <Trash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
