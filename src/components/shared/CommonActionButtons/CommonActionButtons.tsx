import BorrowABookButton from "@/components/BorrowABookButton/BorrowABookButton";
import DeleteABookButton from "@/components/DeleteABookButton/DeleteABookButton";
import UpdateABookButton from "@/components/UpdateABookButton/UpdateABookButton";
import ViewDtailsButton from "@/components/ViewDtailsButton/ViewDtailsButton";
import { cn } from "@/lib/utils";
import { EyeIcon, ReceiptCent, Trash, UploadCloud } from "lucide-react";

export default function CommonActionButtons({
  _id,
  available,
  style,
}: {
  _id: string;
  available?: boolean;
  style?: string;
}) {
  return (
    <div className={cn("flex items-center", style)}>
      <ViewDtailsButton _id={_id}>
        <EyeIcon /> Details
      </ViewDtailsButton>
      <BorrowABookButton _id={_id} available={!available}>
        <ReceiptCent /> Borrow
      </BorrowABookButton>
      <UpdateABookButton _id={_id}>
        <UploadCloud /> Update
      </UpdateABookButton>
      <DeleteABookButton _id={_id}>
        <Trash /> Delete
      </DeleteABookButton>
    </div>
  );
}
