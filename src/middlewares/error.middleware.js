const { errorResponse } = require('../utils/response');

const errorMiddleware = (err, req, res, next) => {
  console.error('[ErrorMiddleware]', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // In production, don't return the full error stack/details to the client
  const errorDetails = process.env.NODE_ENV === 'production' ? null : err;

  return errorResponse(res, message, statusCode, errorDetails);
};

module.exports = errorMiddleware;
