import React, { useEffect, useState } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "available" | "borrowed";
}

const AdminDashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [newBook, setNewBook] = useState({ title: "", author: "", year: "" });

    useEffect(() => {
        fetch("/books")
            .then((res) => res.json())
            .then((data) => setBooks(data));
    }, []);

    const handleAddBook = () => {
        fetch("/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newBook, year: parseInt(newBook.year) }),
        })
            .then((res) => res.json())
            .then((data) => setBooks([...books, data]));
    };

    const handleDeleteBook = (id: number) => {
        fetch(`/books/${id}`, { method: "DELETE" }).then(() =>
            setBooks(books.filter((book) => book.id !== id))
        );
    };

    return (
        <main className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="add-book">
                <h2>Add a Book</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) =>
                        setNewBook({ ...newBook, title: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) =>
                        setNewBook({ ...newBook, author: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={newBook.year}
                    onChange={(e) =>
                        setNewBook({ ...newBook, year: e.target.value })
                    }
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            <div className="book-list">
                <h2>Book List</h2>
                {books.map((book) => (
                    <div key={book.id} className="book-item">
                        <h3>{book.title}</h3>
                        <p>Auteur du livre : {book.author}</p>
                        <p>Year: {book.year}</p>
                        <p>Disponibilité du livre : {book.status}</p>
                        <button onClick={() => handleDeleteBook(book.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AdminDashboard;
