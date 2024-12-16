import axiosInstance from "./axiosInstance";

const host = "http://localhost:8080/api/user/coupons";

export const getCouponsByUser = async (user_id) => {
    try {
        const response = await axiosInstance.get(`${host}/couponList`, {
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

// 날짜 형식을 검증하는 유틸리티 함수
const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD 형식
    return dateString.match(regex) !== null;
};

// 예시로 날짜를 검증하고 API 호출 시 사용하는 함수
export const fetchCouponsWithDateCheck = async (user_id) => {
    try {
        const coupons = await getCouponsByUser(user_id);

        // 각 쿠폰의 날짜 검증 (예: expiry_date)
        coupons.forEach(coupon => {
            if (!isValidDate(coupon.expiry_date)) {
                console.warn(`잘못된 날짜 형식: ${coupon.expiry_date}`);
            }
        });

        return coupons;
    } catch (error) {
        console.error('쿠폰 가져오기 중 오류 발생:', error);
        throw error;
    }
};