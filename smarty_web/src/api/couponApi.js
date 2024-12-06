import axios from "axios";

const host = "http://localhost:8080/api/user/coupons";

export const getCouponsByUser = async (user_id) => {
    try {
        const response = await axios.get(`${host}/couponList`, {
            params: { user_id }, 
            withCredentials: true,
        });
        console.log("회원쿠폰" + response.data); 
        return response.data;
    } catch (error) {
        console.error('쿠폰 불러오기 실패: ', error);
        throw error; 
    }
};