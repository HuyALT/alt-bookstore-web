export type items = {
  cartItemId: string;
  bookId: string;
  title: string;
  author: string;
  coverImageUrl: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CartResponse {
  items: items[];
  totalItems: number;
  totalPrice: number;
}