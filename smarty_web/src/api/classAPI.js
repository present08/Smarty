import axios from "axios";
import axiosInstance from "./axiosInstance";
const host = "http://localhost:8080/api/user/class"

export const getClass = async () => {
    // const response = await axios.get(`${host}/`)
    const response = await axiosInstance.get(`${host}/`)
    return response.data
}

export const classEnroll = async (enrollData) => {
    // const response = await axios.post(`${host}/enroll`, enrollData)
    const response = await axiosInstance.post(`${host}/enroll`, enrollData)
    return response.data
}

export const MembershipUser = async (user_id) => {
    // const response = await axios.get(`${host}/membership/${user_id}`)
    const response = await axiosInstance.get(`${host}/membership/${user_id}`)
    console.log(response.data)
    return response.data;
}



