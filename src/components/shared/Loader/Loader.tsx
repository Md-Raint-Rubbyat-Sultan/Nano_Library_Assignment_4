import { BookAudio, LoaderPinwheel } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-2 text-green-500">
      <BookAudio />
      <span className="text-2xl">Loading</span>
      <LoaderPinwheel className="animate-spin" />
    </div>
  );
}
