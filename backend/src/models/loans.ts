import { Book } from "./books";

interface Loan {
    id: number;
    bookId: number;
    userId: number;
    borrowDate: string;
    dueDate: string;
    status: "emprunte" | "returned";
    bookDetails: Book | null;
}

const loans: Loan[] = [];

export { Loan, loans };
