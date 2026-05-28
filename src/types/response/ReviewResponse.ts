type UserSummary = {
  id: string;
  name: string;
};

export interface ReviewResponse {
  id: string;
  bookId: string;
  user: UserSummary;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  status: "APPROVED" | "PENDING" | "REJECTED";
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: string;
}