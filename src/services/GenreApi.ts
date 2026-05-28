import api from "../config/axios";
import type { GenreResponse } from "../types/response/GenreResponse";
import type { ApiResponse, ApiSuccess } from "../types/response/ApiResponse";

export const getAllGenres = async (): Promise<ApiResponse<GenreResponse[]>> => {
    try {
        const res = await api.get<ApiSuccess<GenreResponse[]>>("/genres");
        return res.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
};