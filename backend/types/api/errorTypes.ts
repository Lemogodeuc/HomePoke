import { ApiError, HttpError } from "../../api/modules/"

export type Errors =
  | ApiError
  | HttpError
