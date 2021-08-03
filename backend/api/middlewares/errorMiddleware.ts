import { Request, Response, NextFunction } from "express";
import { Errors } from "../../types";

const formatError = (req: Request, err: Errors) => {
  const { ip, originalUrl, method } = req;
  return JSON.stringify({ ip, path: originalUrl, method, error: err }, null, 2);
}

const errorMiddleware = (err: Errors, req: Request, res: Response, _: NextFunction) => {
  req.context.logger.error(formatError(req, err));
  const { name, code, message, details } = err;
  return res.status(code || 500).json(Object.assign({ type: name, code, message }, details && { details }));
};

export default errorMiddleware;
