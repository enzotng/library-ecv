interface User {
    id: number;
    username: string;
    password: string;
    role: "user" | "admin";
}

const users: User[] = [
    { id: 1, username: "admin", password: "admin123", role: "admin" },
    { id: 2, username: "user1", password: "user123", role: "user" },
];

export { User, users };
