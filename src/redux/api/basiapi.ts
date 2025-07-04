import type {
  book,
  BookData,
  SingleBookData,
} from "@/interfaces/book.interface";
import type { borrow, summaryData } from "@/interfaces/borrow.interface";
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
      { fileter: string | ""; limit?: number | undefined }
    >({
      query: ({ fileter, limit }) => `/books?filter=${fileter}&limit=${limit}`,
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
    // borrow a book
    borrowABook: builder.mutation<
      Omit<summaryData, "data"> & {
        data: borrow & { _id: string; createdAt: string; updatedAt: string };
      },
      borrow
    >({
      query: (newBorrow) => ({
        url: "/borrow",
        method: "POST",
        body: newBorrow,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    // Update a Book
    updateABook: builder.mutation<
      SingleBookData,
      Partial<book> & Pick<book, "_id">
    >({
      query: ({ _id, ...updatedDoc }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: updatedDoc,
      }),
      invalidatesTags: ["books", "borrow"],
    }),
    // Delete a Book
    deleteABook: builder.mutation<SingleBookData, string>({
      query: (_id) => ({
        url: `/books/${_id}`,
        method: "DELETE",
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
  useBorrowABookMutation,
  useUpdateABookMutation,
  useDeleteABookMutation,
} = baseApi;
