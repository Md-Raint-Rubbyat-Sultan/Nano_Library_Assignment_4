import BooksCard from "@/components/AllBooks/BooksCard";
import Loader from "@/components/shared/Loader/Loader";
import { useGetAllBooksQuery } from "@/redux/api/basiapi";

export default function AllBooks() {
  const { data, isLoading } = useGetAllBooksQuery({
    fileter: "",
    limit: 20,
  });

  if (isLoading) return <Loader />;

  return (
    <section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {data?.data.map((book, idx) => (
          <BooksCard key={idx} book={book} />
        ))}
      </section>
    </section>
  );
}
