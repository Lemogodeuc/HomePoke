import { ApiError, HttpError } from "./index";

const error = {
  default: (error: any) => new ApiError(error),
  server(code: number) {},
  http:(code: number) => new HttpError(code),
  postgres(code: number) {},
}

export default error;