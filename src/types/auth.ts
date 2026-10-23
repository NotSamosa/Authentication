export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
