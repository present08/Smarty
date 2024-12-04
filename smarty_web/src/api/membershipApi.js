import axios from 'axios';

const host = 'http://localhost:8080/api/membership';

//사용자 결제 금액 합계 가져오는 api
export const getPaymentDetailsByUserId = async (user_id) => {
    try {
        const response = await axios.get(`${host}/totalGrade`, { params: { user_id } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment details:", error);
        return null;
    }
};