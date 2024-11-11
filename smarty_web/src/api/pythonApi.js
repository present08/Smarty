import axios from 'axios';

const PYTHON_BASE_URL = 'http://localhost:5000/api';

// 수강 인원 현황 데이터 요청
export const getBarChartData = async () => {
      const response = await axios.get(`${PYTHON_BASE_URL}/bar-data`);
      return response.data;
};

// 시설별 일수입 데이터 요청
export const getLineChartData = async (queryDate) => {
    const response = await axios.get(`${PYTHON_BASE_URL}/line-data`, {
      params: { date: queryDate }
    });
    return response.data;
  };
  
// Pie 차트 데이터 요청 (로그인 버전))
/* export const getPieChartData = async (userId) => {
      const response = await axios.get(`${PYTHON_BASE_URL}/pie-data/${userId}`);
      return response.data;
}; */

// Pie 차트 데이터 요청 (테스트 버전)
export const getPieChartData = async (userId = 'user33') => {
  const response = await axios.get(`${PYTHON_BASE_URL}/pie-data`, {
    params: {user_id : userId}
  });
  return response.data;
};

// 예약현황 데이터 요청
export const getDayPilotCalendarData = async () => {
    const response = await axios.get(`${PYTHON_BASE_URL}/daily-scheduler`);
    return response.data;
};

// 대여품목 데이터 요청 (관리자용)
export const getRentalStatistics = async (selectedDate,facilityName) => {
  const response = await axios.get(`${PYTHON_BASE_URL}/rental-statistics`, {
      params: { date: selectedDate, facility_name: facilityName },
  });
  return response.data;
};

// 개인별 시설 예약&이용 현황 데이터 요청 (로그인 버전)
/* export const getPersonallyData = async (userId) => {
  const response = await axios.get(`${PYTHON_BASE_URL}/personally-data/${userId}`);
  return response.data;
}; */

// 개인별 시설 예약&이용 현황 데이터 요청 (테스트 버전)
export const getPersonallyData = async (userId = 'user33') => {  // 기본 유저 ID 설정
  const response = await axios.get(`${PYTHON_BASE_URL}/personally-data`, {
      params: { user_id: userId }
  });
  return response.data;
};

// 어제 오늘 일 매출 표현 및 비교
export const getIncomeRate = async () => {
  const response = await axios.get(`${PYTHON_BASE_URL}/income-comparison`);
  return response.data;
}

// Python 서버로 시설명과 날짜 데이터 전송
export const sendScheduleData = (facilityName, date) => {
  return axios.post(`${PYTHON_BASE_URL}/daily-scheduler`, {
    facility_name: facilityName,
    date: date
  });
};