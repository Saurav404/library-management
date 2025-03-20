import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bookRoutes from "./src/routes/bookRoute.js";
import userRoutes from "./src/routes/userRoute.js";
import connectDB from "./src/database/db.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api", bookRoutes);

// Error middleware for gracefully handling eror
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
