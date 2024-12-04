import express, { Request, Response } from "express";
import { loans, Loan } from "../models/loans";
import { books, Book } from "../models/books";

const loanRoutes = express.Router();

loanRoutes.get("/", (req: Request, res: Response) => {
    const enrichedLoans = loans.map((loan) => {
        const book = books.find((b) => b.id === loan.bookId);
        return {
            ...loan,
            bookDetails: book || null,
        };
    });
    res.status(200).json(enrichedLoans);
});

loanRoutes.post("/borrow", (req: Request, res: Response) => {
    const { bookId, userId } = req.body;

    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (book.status !== "available") {
        return res
            .status(400)
            .json({ message: "Book is not available for borrowing" });
    }

    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 30);

    const loan: Loan = {
        id: loans.length + 1,
        bookId,
        userId,
        borrowDate: borrowDate.toISOString(),
        dueDate: dueDate.toISOString(),
        status: "borrowed",
        bookDetails: book,
    };

    loans.push(loan);
    book.status = "borrowed";

    res.status(201).json(loan);
});

loanRoutes.put("/return/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    const loan = loans.find((l) => l.id === parseInt(id));

    if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
    }

    if (loan.status === "returned") {
        return res.status(400).json({ message: "Loan already returned" });
    }

    loan.status = "returned";

    const book = books.find((b) => b.id === loan.bookId);
    if (book) {
        book.status = "available";
    }

    res.status(200).json({ message: "Book returned successfully", loan });
});

export { loanRoutes };
