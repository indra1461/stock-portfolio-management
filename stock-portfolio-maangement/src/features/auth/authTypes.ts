export interface User{
    id: number; 
    name: string;
    email: string;
}
export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}