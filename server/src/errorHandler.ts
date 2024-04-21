import { Express, Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error.statusCode)
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });

  const { name, message, statusCode } = error;

  return res.status(statusCode).json({
    type: name,
    message,
    code: statusCode,
  });
};
