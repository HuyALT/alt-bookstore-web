import api from "../config/axios";
import type { ApiResponse, ApiSuccess } from "../types/response/ApiResponse";
import type { PageResponse } from "../types/response/PageResponse";
import type { WishlistResponse } from "../types/response/WishlistResponse";
import { getCurrentUser } from "./AuthApi";

export const getWishlist = async(): Promise<PageResponse<WishlistResponse>> => {
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.get<PageResponse<WishlistResponse>>("/wishlist")
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.get<PageResponse<WishlistResponse>>(`/guest/${guestId}/wishlist`);
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch (error) {
        throw new Error("Failed to fetch wishlist");
    }
}

export const addToWishlist = async (bookId: string): Promise<ApiResponse<WishlistResponse>> => {
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.post<ApiResponse<WishlistResponse>>(`/wishlist/${bookId}`);
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.post<ApiResponse<WishlistResponse>>(`/guest/${guestId}/wishlist/${bookId}`);
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch (error) {
        throw new Error("Failed to add book to wishlist");
    }
}

export const removeFromWishlist = async (bookId: string): Promise<ApiResponse<null>> => {
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.delete<ApiSuccess<null>>(`/wishlist/${bookId}`);
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.delete<ApiSuccess<null>>(`/guest/${guestId}/wishlist/${bookId}`);
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}