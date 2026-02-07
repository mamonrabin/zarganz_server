/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ErrorRequestHandler } from "express";


const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrHandler;