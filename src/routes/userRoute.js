import express from "express";
import { registerUser, loginUser, getUserBorrowedBooks } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:userId/books", authMiddleware, getUserBorrowedBooks);

export default router;
