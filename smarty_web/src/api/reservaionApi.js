import axios from "axios";
import axiosInstance from "./axiosInstance";

const host = "http://localhost:8080/api/user/reservation"

// facility data
export const getfacilityId = async () => {
    // const response = await axios.get(`${host}/`);
    const response = await axiosInstance.get(`${host}/`);
    return response.data
}

// btn data
export const getCourt = async (facility_id, court_id, date) => {
    // const response = await axios.get(`${host}/${facility_id}`, { params: { court_id, date } })
    const response = await axiosInstance.get(`${host}/${facility_id}`, { params: { court_id, date } })
    return response.data
}

// reservation success event( update timeLine )
export const updatePlan = async (postData, facility_id) => {
    // const response = await axios.post(`${host}/${facility_id}`, postData)
    const response = await axiosInstance.post(`${host}/${facility_id}`, postData)
    return response.data
}

export const deleteReservation = async (reservation_id, user_id) => {
    console.log(reservation_id, user_id)
    // const response = await axios.delete(`${host}/${reservation_id}`, { params: { user_id } })
    const response = await axiosInstance.delete(`${host}/${reservation_id}`, { params: { user_id } })
    return response.data
}

export const MembershipUser = async (user_id) => {
    // const response = await axios.get(`${host}/membership/${user_id}`)
    const response = await axiosInstance.get(`${host}/membership/${user_id}`)
    return response.data;
}