interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "available" | "borrowed" | string;
}

const books: Book[] = [];

export { books, Book };
