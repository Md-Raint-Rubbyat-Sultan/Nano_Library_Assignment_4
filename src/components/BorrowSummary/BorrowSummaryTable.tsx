import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { summary } from "@/interfaces/borrow.interface";

export default function BorrowSummaryTable({
  bookSummary,
}: {
  bookSummary: summary[];
}) {
  return (
    <Table className="w-fit">
      <TableCaption className="mb-4">Books Borrow Summary</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">isbn</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Total Number Of Borrow</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookSummary?.map(({ book, totalQuantity }, idx) => (
          <TableRow key={idx}>
            <TableCell>{book?.isbn}</TableCell>
            <TableCell>{book?.title}</TableCell>
            <TableCell className="text-right">{totalQuantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
