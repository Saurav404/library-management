import Book from "../models/Book.js";
import User from "../models/User.js";

// Add a book
export const addBook = async (req, res, next) => {
  try {
    const { title, author, ISBN, quantity } = req.body;
    const bookExists = await Book.findOne({ ISBN });

    if (bookExists) return res.status(400).json({ message: "Book has already been added" });

    const book = new Book({ title, author, ISBN, quantity });
    await book.save();
    res.status(201).json({ data: book, message: "Book has been added to the library" });
  } catch (err) {
    next(err);
  }
};

// Get all books
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ quantity: { $gt: 0 } }).select("-borrowedBy -__v");
    res.json({ data: books, message: "List of all the available books" });
  } catch (err) {
    next(err);
  }
};

// Get book by ID
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).select("-borrowedBy -__v");
    if (!book) return res.status(400).json({ message: "Book not found" });
    res.json({ data: book, message: "Book detail by Id" });
  } catch (err) {
    next(err);
  }
};

// Borrow a book
export const borrowBook = async (req, res, next) => {
  try {
    const { bookId, userId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return res.status(400).json({ message: "Book not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    if (book.quantity <= 0) return res.status(400).json({ message: "Book is not available" });

    // Check if user has already issued this book
    if (user.borrowedBooks.includes(bookId))
      return res.status(400).json({ message: "You have already issued this book" });

    book.quantity -= 1;
    book.borrowedBy.push(userId);
    user.borrowedBooks.push(bookId);

    await book.save();
    await user.save();

    res.json({ data: book, message: "Book borrowed successfully" });
  } catch (err) {
    next(err);
  }
};

// Return a book
export const returnBook = async (req, res, next) => {
  try {
    const { bookId, userId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) return res.status(400).json({ message: "Book not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the user has borrowed this book
    if (!user.borrowedBooks.includes(bookId)) {
      return res.status(400).json({ message: "You have not borrowed this book" });
    }

    book.quantity += 1;
    book.borrowedBy = book.borrowedBy.filter((id) => id.toString() !== userId);
    user.borrowedBooks = user.borrowedBooks.filter((id) => id.toString() !== bookId);

    await book.save();
    await user.save();

    res.json({ data: book, message: "Book returned successfully" });
  } catch (err) {
    next(err);
  }
};
