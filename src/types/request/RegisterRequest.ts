export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
  guestId?: string | null;
}