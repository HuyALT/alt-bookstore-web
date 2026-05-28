import type { GenreResponse } from "./GenreResponse";

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  slug: string;
  genre: GenreResponse;
  price: number;
  stockQty: number;
  description: string;
  yearPublished: number;
  coverImageUrl: string;
  soldCount: number;
  isFeatured: boolean;
  avgRating: number;
  reviewCount: number;
  createdAt: string;
}