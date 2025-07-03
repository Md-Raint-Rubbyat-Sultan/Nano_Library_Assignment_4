import MainLayout from "@/Layouts/MainLayout";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BookDetails from "@/pages/AllBooks/BookDetails/BookDetails";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import Error from "@/pages/Error/Error";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/books/:id",
        element: <BookDetails />,
      },
      {
        path: "/create-book",
        element: <AddBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
  {
    path: "/*",
    element: <Error />,
  },
]);
