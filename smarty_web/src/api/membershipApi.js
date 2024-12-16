import axios from 'axios';
import axiosInstance from "./axiosInstance";
const host = 'http://localhost:8080/api/user/membership';

//사용자 결제 금액 합계 가져오는 api
export const getPaymentDetailsByUserId = async (user_id) => {
    try {
        // const response = await axios.get(`${host}/totalGrade`, { params: { user_id } });
        const response = await axiosInstance.get(`${host}/totalGrade`, { params: { user_id } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment details:", error);
        return null;
    }
};

// 등급 정보 가져오기 
export const getUserMemberGrade = async (user_id) => {
    try {
        // const response = await axios.get(`${host}/memberGrade`, { params: { user_id } });
        const response = await axiosInstance.get(`${host}/memberGrade`, { params: { user_id } });
        console.log("과연 등급을 가져올까나용 ? : ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user grade:', error);
    }
};


