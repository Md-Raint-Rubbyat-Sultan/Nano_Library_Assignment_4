import type { book, BookData } from "@/interfaces/book.interface";
import type { summaryData } from "@/interfaces/borrow.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["books", "borrow"],
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
    // get borrowed summary
    getBorrowedSummary: builder.query<summaryData, void>({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
    // create a book
    createABook: builder.mutation<
      Omit<BookData, "data"> & { data: book },
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
  useGetBorrowedSummaryQuery,
  useCreateABookMutation,
} = baseApi;
