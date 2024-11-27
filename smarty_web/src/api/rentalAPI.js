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
export const createRental = async ({amount, user_id}) => {
    try {
        console.log('API 호출 전 데이터:', amount, user_id);
        const response = await axios.post('http://localhost:8080/api/rentals', {amount,user_id});
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
    const response = await axios.put(`${host}/rentals/${rental_id}/return`);
    // console.log("반납 데이터가 뭐가 있나 ", response.data)
    return response.data;
}

//렌탈 정보 가져오기
export const getProductRentalUser = async (user_id) => {
    const response = await axios.get(`${host}/rentalUser`, {params: {user_id}} );
    // console.log(response.data)
    return response.data;
}

// 유저정보에 List 호출
export const getList = async (user_id) => {
    const response = await axios.get(`${host}/payment/list/${user_id}`)
    // console.log("어떤게 왔나 볼까요 ", response.data)
    return response.data;
}
