import axios from "axios";
import { getList as getFacilities } from "./facilityApi";

const host = "http://localhost:8080/api/user/products";
const cartHost = "http://localhost:8080/api/user/cart";

//시설 정보 조회
export const getFailityData = async () => {
    const facilities = await getFacilities()
    return facilities
}

//전체 상품 조회
export const getProduct = async () => {
    const response = await axios.get(`${host}/`)
    return response.data
}

// 상품 상세 조회 API 추가
export const getProductDetail = async (product_id) => {
    const response = await axios.get(`${host}/detail/${product_id}`)
    return response.data
}

// 상품 삭제 API 추가
export const deleteProduct = async (product_id) => {
    const response = await axios.delete(`${host}/${product_id}`)
    return response.data
}

// 장바구니 추가 API 추가
export const addToCart = async (cartData) => {
    const response = await axios.post(`${cartHost}`, cartData)
    return response.data
}

// 첨부파일 조회
export const getProductFiles = async (product_id) => {
    try {
        const response = await axios.get(`${host}/files/${product_id}`);
        console.log("첨부파일 조회 성공:", response.data);
        return response.data; // 파일 이름 리스트 반환
    } catch (error) {
        console.error("첨부파일 조회 실패:", error.response?.data || error.message);
        throw error;
    }
};