import axios from "axios";
import axiosInstance from "../axiosInstance"
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/admin/rentals`;

// 특정 상품의 대여 정보 조회
export const getRentalsByProduct = async (productId) => {
    try {
        // const response = await axios.get(`${prefix}/${productId}`);
        const response = await axiosInstance.get(`${prefix}/${productId}`);
        console.log("특정 상품 대여 정보 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("특정 상품 대여 정보 조회 실패:", error.response?.data || error.message);
        throw error;
    }
};

