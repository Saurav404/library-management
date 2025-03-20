import express from "express";
import { addBook, getAllBooks, getBookById, borrowBook, returnBook } from "../controllers/bookController.js";
import { validateBook } from "../middleware/validateMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/books", authMiddleware, validateBook, addBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.post("/borrow/:bookId/:userId", authMiddleware, borrowBook);
router.post("/return/:bookId/:userId", authMiddleware, returnBook);

export default router;
