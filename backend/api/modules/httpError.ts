import ApiError from './apiError';
import { httpErrors } from "../constants";

export class HttpError extends ApiError {
  constructor(code: number) {
    super({ code, ...httpErrors[code] });
    this.code = code;
    this.message = httpErrors[code].message;
    this.details = httpErrors[code].details;
  }
}
