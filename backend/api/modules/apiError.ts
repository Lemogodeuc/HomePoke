interface ApiErrorInterface {
  code: number;
  message: string;
  details?: string;
}

class ApiError extends Error {
  name: string;
  code: number;
  message: string;
  details?: string;

  constructor(error: ApiErrorInterface) {
    super(error.message);
    this.name = this.constructor.name;
    this.code = error.code || 500;
    this.message = error.message;
    this.details = error.details;
  }

  getMessage(): { name: string; message: string; code: number; details?: string; } {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export default ApiError;