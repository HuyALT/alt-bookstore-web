import api from "../config/axios";
import type { PageResponse } from "../types/response/PageResponse";
import type { ReviewResponse } from "../types/response/ReviewResponse";

export const getReviewBookIds = async (bookId: string, page: number, size: number): Promise<PageResponse<ReviewResponse>> => {
    try {
        const res = await api.get<PageResponse<ReviewResponse>>(`/reviews/book/${bookId}`, {
            params: {
                page: page,
                size: size,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}