/**
 * @desc this class is responsible about Global operational errors
 */

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Fail" : "Error";
    this.isOperational = true;
  }
}

export default ApiError;
