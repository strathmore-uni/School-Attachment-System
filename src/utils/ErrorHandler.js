const ErrorHandler = (message, statusCode, res = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = ErrorHandler;