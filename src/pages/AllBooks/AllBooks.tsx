import BooksCard from "@/components/AllBooks/BooksCard";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import { useGetAllBooksQuery } from "@/redux/api/basiapi";
import { useState } from "react";

export default function AllBooks() {
  const [page, setPage] = useState(0);
  const limit = 10;
  const { data, isLoading } = useGetAllBooksQuery({
    fileter: "",
    limit,
    page,
  });

  if (isLoading) return <Loader />;

  return (
    <section className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {data?.data.map((book, idx) => (
          <BooksCard key={idx} book={book} />
        ))}
      </section>
      {/* Simple pagination */}
      <section className="flex flex-wrap justify-center items-center gap-2">
        {Array(data?.docCount && Math.ceil(data.docCount / limit))
          .fill(0)
          .map((_, idx: number) => (
            <Button
              variant={"outline"}
              onClick={() => setPage(() => idx)}
              key={idx}
            >
              {idx + 1}
            </Button>
          ))}
      </section>
    </section>
  );
}
