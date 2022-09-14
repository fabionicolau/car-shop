import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ErrorTypes, errorCatalog } from '../helpers/errorCatalog';

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.issues[0].message });
  }

  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { message, status } = mappedError;
    return res.status(status).json({ error: message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;