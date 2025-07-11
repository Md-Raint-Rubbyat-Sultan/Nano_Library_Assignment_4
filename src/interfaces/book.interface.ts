interface book {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface BookData {
  data: book[];
  message: string;
  success: boolean;
  docCount?: number;
}

type SingleBookData = Omit<BookData, "data"> & { data: book };

export type { book, BookData, SingleBookData };
