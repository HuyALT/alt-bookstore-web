import api from "../config/axios";
import type { OrderRequest } from "../types/request/OrderRequest";
import {type ApiSuccess, type ApiResponse } from "../types/response/ApiResponse";
import type { OrderResponse } from "../types/response/OrderResponse";
import type { PageResponse } from "../types/response/PageResponse";

export const checkout = async(req: OrderRequest): Promise<ApiResponse<OrderResponse>> => {
    try {
        const response = await api.post<ApiSuccess<OrderResponse>>("/orders/checkout",req)
        return response.data
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
}

export const myOrders = async(page: number = 0, size: number = 10): Promise<PageResponse<OrderResponse>> => {
    try {
        const response = await api.get<PageResponse<OrderResponse>>("/orders", {
            params: {
                page: page,
                size: size
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getOrderById = async(id: string): Promise<ApiResponse<OrderResponse>> =>{
    try {
        const response = await api.get<ApiSuccess<OrderResponse>>(`/orders/${id}`)
        return response.data
    } catch(error: any) {
        return {
            success: false,
            message: "Fail to get order"
        }
    }
}