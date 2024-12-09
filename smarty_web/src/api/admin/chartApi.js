import axios from "axios";

export const API_SERVER_HOST = "http://localhost:5000"
const prefix = `${API_SERVER_HOST}/api`

export const getIncomeComparison = async () => {
    try {
        const response = await axios.get(`${prefix}/income-comparison`);
        return response.data
    } catch (error) {
        console.error("수입 데이터를 불러오는데 실패하였습니다. : ", error);
        throw error;
    }
}

export const getDailyReservation = async () => {
    try {
        const response = await axios.get(`${prefix}/admin-daily-reservation`);
        return response.data;
    } catch (error) {
        console.error("일일 예약현황을 불러오는데 실패하였습니다. : ", error);
        throw error;
    }
}






