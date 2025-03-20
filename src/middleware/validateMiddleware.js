import { body, validationResult } from "express-validator";

export const validateUser = [
    body("username").isString().trim().notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
        next();
    }
];

export const validateBook = [
    body("title").isString().trim().notEmpty().withMessage("Title is required"),
    body("author").isString().trim().notEmpty().withMessage("Author is required"),
    body("ISBN").isString().trim().notEmpty().withMessage("ISBN is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
        next();
    }
];