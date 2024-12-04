import "./BookCard.css";

interface BookCardProps {
    id: number;
    title: string;
    author: string;
    year: number;
    image?: string;
    status: "available" | "borrowed";
    onBorrow: (bookId: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({
    id,
    title,
    author,
    year,
    image,
    status,
    onBorrow,
}) => {
    return (
        <div className="book-card">
            {image && <img src={image} alt={`${title} cover`} />}
            <h3>{title}</h3>
            <p>Auteur du livre : {author}</p>
            <p>Year: {year}</p>
            <p>Disponibilité du livre : {status}</p>
            {status === "available" && (
                <button onClick={() => onBorrow(id)}>Borrow</button>
            )}
        </div>
    );
};

export default BookCard;
