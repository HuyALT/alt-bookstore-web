import api from "../config/axios";
import type { LoginRequest } from "../types/request/LoginRequest";
import type { RegisterRequest } from "../types/request/RegisterRequest";
import { type ApiSuccess, type ApiResponse } from "../types/response/ApiResponse";
import type { UserProfile } from "../types/response/UserProfile";

export const login = async (loginRequest: LoginRequest): Promise<string> => { 
    try {
        const res = await api.post("/auth/login", {
             
            email: loginRequest.email,
            password: loginRequest.password,
            
        },{
            params: {
               guestId: loginRequest.guestId
            }
        });
        return res.data;
    }
    catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const register = async (registerRequest: RegisterRequest): Promise<string> => {
    try {
        const res = await api.post("/auth/register", {
            userName: registerRequest.userName,
            email: registerRequest.email,
            password: registerRequest.password
        }, {
            params: {
                guestId: registerRequest.guestId
            }
        });
        return res.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

export const logout = async (): Promise<String> => {
    try {
        const res = await api.post("/auth/logout");
        return res.data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

export const getCurrentUser = async (): Promise<ApiResponse<UserProfile>> => {
    try {
        const res = await api.get<ApiSuccess<UserProfile>>("/auth/me");
        return res.data;
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "",
        }
    }
};