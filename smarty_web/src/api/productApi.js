import axios from "axios";
import { getList as getFacilities} from "./facilityApi";

const host = "http://localhost:8080/api/user/products";

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
    const response = await axios.post(`${host}/cart`, cartData)
    return response.data
}