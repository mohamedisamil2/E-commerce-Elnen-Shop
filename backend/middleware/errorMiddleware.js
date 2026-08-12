// Not Found
function NotFound(req, res, next) {
  const notfound = new Error(`Not Found ${req.originalUrl}`);
  res.status = 404;
  next();
}

// Error Handler
function errHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 404 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

export { NotFound, errHandler };
