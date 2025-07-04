import { useParams } from "react-router";
import BorrowABookForm from "./BorrowABookForm";
import { useGetSingleBookQuery } from "@/redux/api/basiapi";
import Loader from "@/components/shared/Loader/Loader";
import { cn } from "@/lib/utils";

export default function BorrowABook() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id as string);

  if (isLoading) return <Loader />;
  console.log(data);

  return (
    <div>
      <div className="py-6 px-2 space-y-2">
        <h2
          className={cn(
            "text-3xl",
            data?.data?.available ? "text-green-500" : "text-orange-500"
          )}
        >
          {data?.data?.title}
        </h2>
        <p>
          <span className="font-medium">Availabel copies:</span>{" "}
          {data?.data?.copies}
        </p>
      </div>
      <BorrowABookForm
        _id={id as string}
        available={data?.data?.available as boolean}
      ></BorrowABookForm>
    </div>
  );
}
