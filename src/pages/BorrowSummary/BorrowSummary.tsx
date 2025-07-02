import BorrowSummaryTable from "@/components/BorrowSummary/BorrowSummaryTable";
import Loader from "@/components/shared/Loader/Loader";
import { useGetBorrowedSummaryQuery } from "@/redux/api/basiapi";
import NlGirl2 from "@/assets/image_2.jpg";

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowedSummaryQuery(undefined);

  if (isLoading) return <Loader />;

  return (
    <section className="flex justify-center items-center">
      <div className="hidden md:block w-[30%]">
        <img src={NlGirl2} alt="A girl reading book" className="w-full" />
      </div>
      <div>
        <BorrowSummaryTable bookSummary={data?.data || []} />
      </div>
    </section>
  );
}
