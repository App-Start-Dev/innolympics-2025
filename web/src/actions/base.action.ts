"use server";
import api from "@/configs/axios.config";

export const getBase = async () => {
    try {
        const response = await api.get("/");
        return response 
    }
    catch (error) {
        return error
    }
}