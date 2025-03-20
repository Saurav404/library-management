import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

// Register user
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const userDetails = user.toObject();
    delete userDetails.password;
    delete userDetails.__v;
    res.status(200).json({ data: { user: userDetails, token }, message: "User registered" });
  } catch (err) {
    next(err);
  }
};

// User login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const userDetails = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json({ data: { user: userDetails, token }, message: "User loggedIn" });
  } catch (err) {
    next(err);
  }
};

// Get books borrowed by a user
export const getUserBorrowedBooks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate({
      path: "borrowedBooks",
      select: "-borrowedBy -quantity -__v",
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json({ data: user.borrowedBooks, message: "List of all the books borrowed by the user" });
  } catch (err) {
    next(err);
  }
};
