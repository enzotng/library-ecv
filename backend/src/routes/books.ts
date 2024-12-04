import express, { Request, Response } from "express";
import { books } from "../models/books";

const bookRoutes = express.Router();

bookRoutes.get("/", (req: Request, res: Response) => {
    res.status(200).json(books);
});

bookRoutes.post("/", (req: Request, res: Response) => {
    const { title, author, year, image } = req.body;

    const newBook = {
        id: books.length + 1,
        title,
        author,
        year,
        image,
        status: "disponible",
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

bookRoutes.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, author, year, image, status } = req.body;

    const book = books.find((b) => b.id === parseInt(id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;
    book.image = image || book.image;
    book.status = status || book.status;

    res.status(200).json(book);
});

bookRoutes.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params;

    const index = books.findIndex((b) => b.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(index, 1);
    res.status(204).send();
});

export { bookRoutes };
