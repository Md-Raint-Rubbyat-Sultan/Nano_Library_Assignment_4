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
import { Textarea } from "../ui/textarea";
import { genre } from "@/lib/constants";
import { useCreateABookMutation } from "@/redux/api/basiapi";
import { LoaderPinwheel } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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
  const [createBook, { isLoading }] = useCreateABookMutation();
  const navigate = useNavigate();

  // zod form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "NON_FICTION",
      isbn: "",
      copies: 0,
      description: "",
    },
  });

  // form submit funtion
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await createBook({ ...values, available: true });
    if (data?.success) {
      toast(`The book: "${data?.data?.title}" is added`, {
        position: "top-center",
        icon: "✅",
      });
      form.reset();
      navigate("/books");
    } else {
      toast(`Unable to add book. Error: ${data?.message}`, {
        position: "top-center",
        icon: "❌",
      });
      form.reset();
    }
  }

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
                {/* <Input
                  placeholder="some key factior about the book"
                  {...field}
                /> */}
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          ADD {isLoading && <LoaderPinwheel className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
