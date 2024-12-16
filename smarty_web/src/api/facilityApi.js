import axiosInstance from "./axiosInstance";
export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/user/facilities`


export const getList = async() => {
    const res = await axiosInstance.get(`${prefix}/list`)
    return res.data
}

export const getUserReservationList = async (user_id) => {
    // const response = await axios.get(`${prefix}/reservation/${user_id}`)
    const response = await axiosInstance.get(`${prefix}/reservation/${user_id}`)
    // console.log("여기에 데이터가 들오와야 함", response.data)
    return response.data
}