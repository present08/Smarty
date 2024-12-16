import axios from "axios";
import axiosInstance from "./axiosInstance";
const host = "http://localhost:8080/api/user/rentals"

// 전체 렌탈 목록 조회
export const getAllRentals = async () => {
    // const response = await axios.get(`${host}`);
    const response = await axiosInstance.get(`${host}`);
    return response.data;
}

// 렌탈 상세 조회
export const getRentalById = async (rental_id) => {
    // const response = await axios.get(`${host}/${rental_id}`);
    const response = await axiosInstance.get(`${host}/${rental_id}`);
    // console.log("getRentalById : ",response.data)
    return response.data;
}

// 렌탈 신청
export const createRental = async ({ amount, user_id }) => {
    try {
        console.log('API 호출 전 데이터:', amount, user_id);
        // const response = await axios.post('http://localhost:8080/api/rentals', {amount,user_id});
        const response = await axiosInstance.post('/user/rentals', {amount,user_id});
        // console.log('API 응답:', response);
        // console.log("여기를 확인: ", response.data)
        return response.data;
    } catch (error) {
        console.error('API 에러:', error);
        throw error;
    }
};

// 렌탈 반납
export const returnRental = async (rental_id) => {
    // const response = await axios.put(`${host}/${rental_id}/return`);
    const response = await axiosInstance.put(`${host}/${rental_id}/return`);
    console.log("반납 데이터가 뭐가 있나 ", response.data)
    return response.data;
}

//렌탈 정보 가져오기
export const getProductRentalUser = async (user_id) => {
    // const response = await axios.get(`${host}/rentalUser`, {params: {user_id }} );
    const response = await axiosInstance.get(`${host}/rentalUser`, {params: {user_id }} );
    // console.log(response.data)
    return response.data;
}

export const getList = async (user_id) => {
    const response = await axiosInstance.get(`${host}/list/${user_id}`)
    return response.data;
}

//카트에서 렌탈서버로 던지기
export const cartRental = async (postData) => {
    console.log("카트에서 렌탈 서버로 던지는 postData", postData)
    const response = await axiosInstance.post(`/user/cart/rentals`, postData)
    console.log("카트에서 렌탈 서버로 던지는 response.data", response.data)
    return response.data
}


