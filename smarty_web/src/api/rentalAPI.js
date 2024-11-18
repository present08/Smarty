import axios from "axios";

const host = "http://localhost:8080/api"

// 전체 렌탈 목록 조회
export const getAllRentals = async () => {
    const response = await axios.get(`${host}/rentals`);
    return response.data;
}

// 렌탈 상세 조회
export const getRentalById = async (rental_id) => {
    const response = await axios.get(`${host}/rentals/${rental_id}`);
    return response.data;
}

// 렌탈 신청
export const createRental = async (rentalData) => {
    try {
        console.log('API 호출 전 데이터:', rentalData);
        const response = await axios.post('http://localhost:8080/api/rentals', rentalData);
        console.log('API 응답:', response);
        return response.data;
    } catch (error) {
        console.error('API 에러:', error);
        throw error;
    }
};

// 렌탈 반납
export const returnRental = async (rental_id) => {
    const response = await axios.put(`${host}/rentals/${rental_id}/return`);
    return response.data;
}

//렌탈 정보 가져오기
export const getProductRentalUser = async (user_id) => {
    const response = await axios.get(`${host}/rentalUser`, {params: {user_id}} );
    console.log(response.data)
    return response.data;
}