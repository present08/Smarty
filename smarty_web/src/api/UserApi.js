import axios from "axios";

const host = "http://localhost:8080/api/auth";


// 회원가입
export const signUp = async (userData) => {
    const signupResponse = await axios.post(`${host}/signup`, userData, { responseType: 'arraybuffer' });
    return signupResponse.data;
}

// 로그인
export const login = async (user_id, password) => {
    const response = await axios.post(`${host}/login`, { user_id, password }, { withCredentials: true });
    return response.data;
}

// 로그인 상태 확인
export const checkLoginStatus = async () => {
    const response = await axios.get(`${host}/status`, { withCredentials: true });
    return response.data;
};

// 로그아웃
export const logout = async () => {
    try {
        const response = await axios.post(`${host}/logout`, {}, { withCredentials: true });
        console.log(response.data);
        return response.data;
    } catch (error) {
        alert('로그아웃 중 오류 발생: ', error);
    }
};

// 예약 정보 데이터 가져오기
export const getReservationInfo = async (user_id) => {
    const response = await axios.get(`${host}/reservationUser`, { params: { user_id } });
    console.log(response.data);
    return response.data;
}


