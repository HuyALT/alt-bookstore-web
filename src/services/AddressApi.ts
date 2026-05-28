import api from "../config/axios";
import type { AddressRequest } from "../types/request/AddressResquest";
import type { AddressResponse } from "../types/response/AddressResponse";
import {type ApiSuccess, type ApiResponse } from "../types/response/ApiResponse";

export const getAddresses = async (): Promise<ApiResponse<AddressResponse[]>> => {
    try {
        const response = await api.get<ApiSuccess<AddressResponse[]>>("/addresses");
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch addresses",
        }
    }
}

export const addAddress = async (address: AddressRequest): Promise<ApiResponse<AddressResponse>> => {
    try {
        const response = await api.post<ApiSuccess<AddressResponse>>("/addresses", address);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to add address",
        }
    }
}

export const updateAddress = async (id: string, address: AddressRequest): Promise<ApiResponse<AddressResponse>> => {
    try {
        const response = await api.put<ApiSuccess<AddressResponse>>(`/addresses/${id}`, address);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to update address",
        }
    }
}

export const deleteAddress = async (id: string): Promise<ApiResponse<null>> => {
    try {
        const response = await api.delete<ApiSuccess<null>>(`/addresses/${id}`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete address",
        };
    }
}