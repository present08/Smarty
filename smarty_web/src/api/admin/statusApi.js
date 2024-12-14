import axios from "axios";
import axiosInstance from "../axiosInstance"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/status`

export const getListStatus = async(facility_id, date) => {
    try {
        // const res = await axios.get(`${prefix}/${facility_id}`, {params: {date}})
        const res = await axiosInstance.get(`${prefix}/${facility_id}`, {params: {date}})
        console.log("getListStatus : ", res.data)
        return res.data
    } catch (error) {
        console.error("ERROR! : ", error)
    }
}

export const getListAttendance = async(class_id, date) => {
    try {
        // const res = await axios.get(`${prefix}/attendance/${class_id}`, {params: {date}})
        const res = await axiosInstance.get(`${prefix}/attendance/${class_id}`, {params: {date}})
        console.log("getListAttendance : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListUser = async(date) => {
    try {
        // const res = await axios.get(`${prefix}/user`, {params: {date}})
        const res = await axiosInstance.get(`${prefix}/user`, {params: {date}})
        console.log("getListUser : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

// Muam e 77ㅓ
export const permissionWait = async () => {
    // const response = await axios.get(`${prefix}/permission`)
    const response = await axiosInstance.get(`${prefix}/permission`)
    return response.data
}

export const permission = async (postData) => {
    // const response = await axios.post(`${prefix}/permissionPost`, postData, {
    const response = await axiosInstance.post(`${prefix}/permissionPost`, postData, {
        headers: {
            'Content-Type': 'text/plain',  // Content-Type을 text/plain으로 설정
        }
    })
    return response.data;
}

export const ArrayPermission = async (postData) => {
    // const response = await axios.post(`${prefix}/arrpermissionpost`, postData)
    const response = await axiosInstance.post(`${prefix}/arrpermissionpost`, postData)
    return response.data;
}

// adminpage widgetLg
export const getPaymentAll = async () => {
    // const response = await axios.get(`${prefix}/paymentall`)
    const response = await axiosInstance.get(`${prefix}/paymentall`)
    return response.data;
}