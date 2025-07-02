import NLGirl3 from "@/assets/image.jpg";
import { Link } from "react-router";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-between p-6">
      <h2 className="text-3xl text-green-600">4O4!</h2>
      <img
        src={NLGirl3}
        alt="Girl Reading book on 4O4 page"
        width={300}
        height={300}
      />
      <h2 className="text-3xl text-green-600">This page is not found</h2>
      <div className="text-2xl font-semibold text-green-600 underline-offset-2 underline mt-2">
        <Link to={"/"}>&larr;Back to Home</Link>
      </div>
    </div>
  );
}
