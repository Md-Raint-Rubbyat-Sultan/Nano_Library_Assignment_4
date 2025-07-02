import BooksTable from "@/components/Home/BooksTable";
import Loader from "@/components/shared/Loader/Loader";
import { useGetAllBooksQuery } from "@/redux/api/basiapi";

export default function Home() {
  const { data, isLoading } = useGetAllBooksQuery(
    { fileter: "", limit: 5 },
    {
      pollingInterval: 5 * 60 * 1000,
      skipPollingIfUnfocused: true,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <section>
      <BooksTable books={data?.data || []} />
    </section>
  );
}
