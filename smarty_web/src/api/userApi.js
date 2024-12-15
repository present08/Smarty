import axiosInstance from "./axiosInstance";
const host = "http://localhost:8080/api/auth";


// 회원가입
export const signUp = async (userData) => {
    // const signupResponse = await axios.post(`${host}/signup`, userData, { responseType: 'arraybuffer' });
    const signupResponse = await axiosInstance.post(`${host}/signup`, userData, { responseType: 'arraybuffer' });
    return signupResponse.data;
}

// 로그인
export const login = async (user_id, password) => {
    // const response = await axios.post(`${host}/login`, { user_id, password }, { withCredentials: true });
    const response = await axiosInstance.post(`${host}/login`, { user_id, password }, { withCredentials: true });
    return response.data;
}

// 로그인 상태 확인
// export const checkLoginStatus = async () => {
//     const response = await axios.get(`${host}/status`, { withCredentials: true });
//     return response.data;
// };

// 로그아웃
export const logout = async () => {
    try {
        // const response = await axios.post(`${host}/logout`, {}, { withCredentials: true });
        const response = await axiosInstance.post(`${host}/logout`, {}, { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert('로그아웃 중 오류 발생: ', error);
    }
};

// 일일입장 예약 정보 데이터 가져오기
export const getReservationInfo = async (user_id) => {
    // const response = await axios.get(`${host}/reservationUser`, { params: { user_id } });
    const response = await axiosInstance.get(`${host}/reservationUser`, { params: { user_id } });
    console.log(response.data);
    return response.data;
}

// 수강신청 예약 정보 데이터 가져오기 (쿼리문 없음)
export const getUserClassApplication = async (user_id) => {
    // const response = await axios.get(`${host}/classApplication`, { params: { user_id } });
    const response = await axiosInstance.get(`${host}/classApplication`, { params: { user_id } });
    console.log(response.data);
    return response.data;
}

//렌탈 정보 가져오기
export const getProductRentalUser = async (user_id) => {
    try {
        // const response = await axios.get(`${host}/rentalMyPageUser`, {
        const response = await axiosInstance.get(`${host}/rentalMyPageUser`, {
            params: { user_id }
        });
        console.log('API Response:', response.data); // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// 회원정보 수정
export const modify_info = async(userInfo) => {
    const response = await axiosInstance.put(`${host}/info`, userInfo);
    return response.data
}
