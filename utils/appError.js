class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
    this.isOpetational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
