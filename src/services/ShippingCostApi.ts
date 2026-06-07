import api from "../config/axios";
import {type ApiSuccess, type ApiResponse } from "../types/response/ApiResponse";
import type { ShippingCostReposne } from "../types/response/ShippingCostResponse";

export const getAllShippingCosts = async(): Promise<ApiResponse<ShippingCostReposne[]>> =>{
    try {
        const response = await api.get<ApiSuccess<ShippingCostReposne[]>>("/shipping-costs");
        return response.data
    } catch (error: any) {
        return {
            success:false,
            message: "Fail to get Shipping cost"
        }
    }
}