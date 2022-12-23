export interface User {
  id?: string;
  fullName?: string;
  email?: string;
  role?: number;
  status?: number;
  createdOn?: any;
  updatedOn?: any;
}

export interface CreateUser {
  id?: string;
  fullName?: string;
  email?: string;
  role?: number;
  status?: number;
  password?: string;
}

export interface UsersPage {
  users: User[];
  total: number;
}
