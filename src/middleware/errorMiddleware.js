const errorMiddleware = (error, req, res, next) => {
  try {
    const httpStatus = error.httpStatus || 500;
    const message = error.message || "Something went wrong";
    res.status(httpStatus).json({ message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
