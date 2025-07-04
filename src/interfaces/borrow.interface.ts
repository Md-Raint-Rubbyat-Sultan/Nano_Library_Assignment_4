interface borrow {
  book: string;
  quantity: number;
  dueDate: string;
}

interface summary {
  book: {
    title: string;
    isbn: number;
  };
  totalQuantity: number;
}

interface summaryData {
  data: summary[];
  message: string;
  success: boolean;
}

export type { borrow, summary, summaryData };
