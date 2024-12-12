import axios from "axios";

export const API_SERVER_HOST = "http://localhost:5500"
const prefix = `${API_SERVER_HOST}/api`

export const getIncomeComparison = async () => {
  try {
    const response = await axios.get(`${prefix}/admin-income-comparison`);
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

export const getRentalStatistic = async (facility_id) => {
  try {
    const response = await axios.get(`${prefix}/admin-rental-statistics`, {
      params: {
        facility_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("시설정보를 가져오는 실패하였습니다:", error);
    throw error;
  }
};

export const getEnrollment = async () => {
  try {
    const response = await axios.get(`${prefix}/admin-enrollment`);
    return response.data;
  } catch (error) {
    console.error("수강 데이터를 가져오는데 실패하였습니다. : ", error);
    throw error;
  }
}