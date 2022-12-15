export interface User {
  id?: string;
  fullName?: string;
  email?: string;
  role?: number;
  status?: number;
}

export interface CreateUser {
  id?: string;
  fullName?: string;
  email?: string;
  role?: number;
  status?: number;
  password?: string;
}
