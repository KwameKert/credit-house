import { User } from '../user/user.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  email: string;
  status: string;
  role: string;
  created_at: Date;
  updated_at: Date;
  token: string;
}
