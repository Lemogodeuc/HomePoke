export interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  created_at: string;
  updated_at: string;
}
