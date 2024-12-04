import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { bookRoutes } from "./routes/books";
import { authRoutes } from "./routes/auth";
import { loanRoutes } from "./routes/loans";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/loans", loanRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
