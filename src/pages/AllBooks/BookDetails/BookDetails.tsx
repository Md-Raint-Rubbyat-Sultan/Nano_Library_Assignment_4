import Loader from "@/components/shared/Loader/Loader";
import { useGetSingleBookQuery } from "@/redux/api/basiapi";
import { useParams } from "react-router";

export default function BookDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id as string);

  if (isLoading) return <Loader />;
  console.log(data);

  return <div>BookDetails</div>;
}
