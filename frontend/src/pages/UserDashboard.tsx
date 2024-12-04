import React, { useEffect, useState } from "react";

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "available" | "borrowed";
}

interface Loan {
    id: number;
    bookId: number;
    userId: number;
    borrowDate: string;
    dueDate: string;
    status: "borrowed" | "returned";
    bookDetails: Book | null;
}

const UserDashboard: React.FC = () => {
    const [borrowedBooks, setBorrowedBooks] = useState<Loan[]>([]);

    useEffect(() => {
        fetch("/loans")
            .then((res) => res.json())
            .then((data) => setBorrowedBooks(data));
    }, []);

    const handleReturnBook = (id: number) => {
        fetch(`/loans/${id}`, { method: "PUT" }).then(() =>
            setBorrowedBooks(borrowedBooks.filter((loan) => loan.id !== id))
        );
    };

    return (
        <div className="user-dashboard">
            <h1>User Dashboard</h1>

            <div className="borrowed-books">
                <h2>Borrowed Books</h2>
                {borrowedBooks.length > 0 ? (
                    borrowedBooks.map(
                        (loan) =>
                            loan.bookDetails && (
                                <div key={loan.id} className="book-item">
                                    <h3>{loan.bookDetails.title}</h3>
                                    <p>
                                        Auteur du livre :{" "}
                                        {loan.bookDetails.author}
                                    </p>
                                    <p>Year: {loan.bookDetails.year}</p>
                                    <button
                                        onClick={() =>
                                            handleReturnBook(loan.id)
                                        }
                                    >
                                        Return
                                    </button>
                                </div>
                            )
                    )
                ) : (
                    <p>You have no borrowed books.</p>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
