import api from "../config/axios"
import type { CartRequest } from "../types/request/CartRequest";
import type { ApiResponse, ApiSuccess } from "../types/response/ApiResponse"
import type { CartResponse } from "../types/response/CartResponse"
import { getCurrentUser } from "./AuthApi";


export const getCart = async(): Promise<ApiResponse<CartResponse>> =>{
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.get<ApiSuccess<CartResponse>>("/cart");
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.get<ApiSuccess<CartResponse>>(`/guest/${guestId}/cart`);
            return res.data
        }
        
        throw new Error("User not authenticated and no guest ID found");
    } catch(error: any){
       return {
        success: false,
        message: error.response?.data?.message || "",
       }
    }
}

export const addOrUpdateCart = async(cartRequest: CartRequest): Promise<ApiResponse<CartResponse>> => {
    try {
        const user = await getCurrentUser();
        if (user.success) {
             const res = await api.put<ApiSuccess<CartResponse>>(`/cart`, cartRequest);
             return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            console.log(cartRequest);
            const res = await api.put<ApiSuccess<CartResponse>>(`/guest/${guestId}/cart`, cartRequest);
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch(error: any){
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    };
}

export const incrementItem = async(bookId: string): Promise<ApiResponse<CartResponse>> => {
    try {
        const user = await getCurrentUser();
        const resitem = await getCart();
        if (user.success) {
            if (resitem.success) {
                if (resitem.data.items.some(item => item.bookId === bookId)) {
                    const res = await api.put<ApiSuccess<CartResponse>>(`/cart/${bookId}/increment`)
                    return res.data;
                } else {
                    const res = await addOrUpdateCart({ bookId, quantity: 1 });
                    return res;
                }
            }
            const res = await addOrUpdateCart({ bookId, quantity: 1 });
            return res;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            if (resitem.success) {
                if (resitem.data.items.some(item => item.bookId === bookId)) {
                    const res = await api.put<ApiSuccess<CartResponse>>(`/guest/${guestId}/cart/${bookId}/increment`)
                    return res.data;
                } else {
                    const res = await addOrUpdateCart({ bookId, quantity: 1 });
                    return res;
                }
            }
            const res = await addOrUpdateCart({ bookId, quantity: 1 });
            return res;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch(error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
}

export const decrementItem = async(bookId: string): Promise<ApiResponse<CartResponse>> =>{
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.put<ApiSuccess<CartResponse>>(`/cart/${bookId}/decrement`)
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.put<ApiSuccess<CartResponse>>(`/guest/${guestId}/cart/${bookId}/decrement`)
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch(error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
}

export const removeItemFromCart = async(bookId: string): Promise<ApiResponse<CartResponse>> => {
    try {
        const user = await getCurrentUser();
        if (user.success) {
            const res = await api.delete<ApiSuccess<CartResponse>>(`/cart/${bookId}`);
            return res.data;
        }
        const guestId = localStorage.getItem("guestId");
        if (guestId) {
            const res = await api.delete<ApiSuccess<CartResponse>>(`/guest/${guestId}/cart/${bookId}`);
            return res.data;
        }
        throw new Error("User not authenticated and no guest ID found");
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
}

export const clearCart = async() => {
    const res = await api.delete(`/cart`)
}
