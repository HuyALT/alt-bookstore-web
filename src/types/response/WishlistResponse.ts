import type { BookResponse } from "./BookResponse";

export interface WishlistResponse {
    wishlistItemId: string;
    book: BookResponse;
    addedAt: string;
}