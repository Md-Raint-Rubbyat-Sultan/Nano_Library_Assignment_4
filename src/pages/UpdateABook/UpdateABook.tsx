import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { genre } from "@/lib/constants";
import {
  useCreateABookMutation,
  useGetSingleBookQuery,
  useUpdateABookMutation,
} from "@/redux/api/basiapi";
import { LoaderPinwheel } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/shared/Loader/Loader";
import type { book } from "@/interfaces/book.interface";

// zod schema
const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.enum(genre),
  isbn: z.string().min(1),
  description: z.string().optional(),
  copies: z.number().int().min(1).positive(),
});

export default function AddBookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const _id = id as string;
  const { data, isLoading } = useGetSingleBookQuery(_id);
  const [updateBook, { isLoading: updateLoading }] = useUpdateABookMutation();

  const bookData = data?.data;

  // zod form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: bookData?.title ?? "",
      author: bookData?.author ?? "",
      genre: bookData?.genre ?? "NON_FICTION",
      isbn: bookData?.isbn ?? "",
      copies: bookData?.copies ?? 0,
      description: bookData?.description ?? "",
    },
  });

  // form submit funtion
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { data } = await updateBook({ _id, ...values });
    if (data?.data) {
      toast(`The book: "${data?.data?.title}" is added`, {
        position: "top-center",
        icon: "✅",
      });
      form.reset();
      navigate("/books", { replace: true });
    } else {
      toast(`Unable to add book. Error: ${data?.message}`, {
        position: "top-center",
        icon: "❌",
      });
      form.reset();
    }
  }

  if (isLoading) return <Loader />;

  if (!data)
    return (
      <div className="text-3xl text-green-500 font-medium">
        Sorry Book Not Found!
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* author */}
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* isbn */}
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN Number</FormLabel>
              <FormControl>
                <Input placeholder="EX. 9781447256236" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* copies */}
        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="How many copies do you have? (e.g. 20)"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="some key factors about the book"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* genre */}
        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select Genre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {genre.map((g, idx) => (
                    <SelectItem key={idx} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={updateLoading}>
          Update {updateLoading && <LoaderPinwheel className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
