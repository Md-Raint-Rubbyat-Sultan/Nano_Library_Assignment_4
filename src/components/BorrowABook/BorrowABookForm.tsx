import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon, LoaderPinwheel } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useBorrowABookMutation } from "@/redux/api/basiapi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// zod schema
const formSchema = z.object({
  quantity: z.number().int().min(1).positive(),
  dueDate: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default function BorrowABookForm({
  _id,
  available,
}: {
  _id: string;
  available: boolean;
}) {
  const [createBorrow, { isLoading }] = useBorrowABookMutation();

  const navigate = useNavigate();

  // zod form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
  });

  // form submit funtion
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, dueDate: values.dueDate.toISOString() });
    const { data } = await createBorrow({
      ...values,
      dueDate: values.dueDate.toISOString(),
      book: _id,
    });
    if (data?.success) {
      toast(`The book is borrowed`, {
        position: "top-center",
        icon: "✅",
      });
      form.reset();
      navigate("/books");
    } else {
      toast(`${data?.message}. Unable to borrow.`, {
        position: "top-center",
        icon: "❌",
      });
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantites</FormLabel>
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
        {/* Due Date */}
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the date by which the book should be returned.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={!available}>
          Borrow {isLoading && <LoaderPinwheel className="animate-spin" />}
        </Button>
      </form>
    </Form>
  );
}
