import React, { useEffect, useState } from "react";
import { BookCard } from "../../components/BookCard";

import "./Home.css";

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "disponible" | "emprunte";
}

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    const handleBorrow = (bookId: number) => {
        fetch("/loans/borrow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookId, userId: 1 }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((loan) => {
                setBooks((prevBooks) => prevBooks.map((book) => (book.id === bookId ? { ...book, status: "emprunte" } : book)));
            })
            .catch((err) => {
                console.error("Error borrowing book:", err);
                alert("Failed to borrow the book. Please try again.");
            });
    };

    return (
        <main className="homeWrapper">
            <h1>Library - ECV</h1>
            <div className="bookWrapper">
                {books.map((book) => (
                    <BookCard key={book.id} {...book} onBorrow={handleBorrow} />
                ))}
            </div>
        </main>
    );
};

export default Home;
