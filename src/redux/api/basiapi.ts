import type {
  book,
  BookData,
  SingleBookData,
} from "@/interfaces/book.interface";
import type { summaryData } from "@/interfaces/borrow.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["books", "borrow", "book"],
  endpoints: (builder) => ({
    // get all books
    getAllBooks: builder.query<
      BookData,
      { fileter: string | ""; limit: number }
    >({
      query: ({ fileter, limit = 10 }) =>
        `/books?filter=${fileter}&limit=${limit}`,
      providesTags: ["books"],
    }),
    // get a single book
    getSingleBook: builder.query<SingleBookData, string>({
      query: (_id) => `/books/${_id}`,
      providesTags: ["book"],
    }),
    // get borrowed summary
    getBorrowedSummary: builder.query<summaryData, void>({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    // create a book
    createABook: builder.mutation<
      SingleBookData,
      Omit<book, "_id" | "createdAt" | "updatedAt">
    >({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    // end of queries
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useGetBorrowedSummaryQuery,
  useCreateABookMutation,
} = baseApi;
