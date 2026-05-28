export interface LoginRequest {
  email: string;
  password: string;
  guestId?: string | null;
}