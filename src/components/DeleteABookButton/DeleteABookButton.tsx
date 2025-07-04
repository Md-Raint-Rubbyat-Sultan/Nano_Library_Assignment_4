import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  useDeleteABookMutation,
  useGetSingleBookQuery,
} from "@/redux/api/basiapi";
import Loader from "../shared/Loader/Loader";
import { toast } from "sonner";
import { LoaderPinwheel } from "lucide-react";

export default function DeleteABookButton({
  children,
  _id,
  style,
}: {
  children: ReactNode;
  _id: string;
  style?: string;
}) {
  const { data, isLoading } = useGetSingleBookQuery(_id);
  const [deleteBook, { isLoading: isBookDeleteLoading }] =
    useDeleteABookMutation();
  const [open, setOpen] = useState<boolean>(false);

  // Handel Delete
  const handelDeleteButton = async (_id: string) => {
    const { data } = await deleteBook(_id);
    if (data?.data) {
      toast(`The book: "${data?.data?.title}" is deleted`, {
        position: "top-center",
        icon: "✅",
      });
    } else {
      toast(`Unable to add book. Book does not exist!`, {
        position: "top-center",
        icon: "❌",
      });
    }
    setOpen((prev) => !prev);
  };

  if (isLoading) <Loader />;

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button variant="outline" className={cn("text-green-500", style)}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p className="py-6">
              Are You Sure You Want To Delete "{data?.data?.title}"?
            </p>
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={() => handelDeleteButton(_id)}>
            Delete{" "}
            {isBookDeleteLoading && <LoaderPinwheel className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
