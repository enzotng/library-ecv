interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "disponible" | "emprunte" | string;
}

const books: Book[] = [];

export { books, Book };
