import axios from "axios"
import axiosInstance from "../axiosInstance"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/classes`

export const postAddClass = async(classList) => {
    try{
        // const res = await axios.post(`${prefix}/`, classList)
        const res = await axiosInstance.post(`${prefix}/`, classList)
        console.log("postAddClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListClass = async(facility_id) => {
    try {
        // const res = await axios.get(`${prefix}/list/${facility_id}`)
        const res = await axiosInstance.get(`${prefix}/list/${facility_id}`)
        console.log("getListClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListClassDetail = async(class_id) => {
    try {
        // const res = await axios.get(`${prefix}/detailList/${class_id}`)
        const res = await axiosInstance.get(`${prefix}/detailList/${class_id}`)
        console.log("getListClassDetail : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getOneClass = async(class_id) => {
    try {        
        // const res = await axios.get(`${prefix}/${class_id}`)
        const res = await axiosInstance.get(`${prefix}/${class_id}`)
        console.log("getOneClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const putOneClass = async(class_id, classList) => {
    try {
        // const res = await axios.put(`${prefix}/${class_id}`, classList)
        const res = await axiosInstance.put(`${prefix}/${class_id}`, classList)
        console.log("putOneClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const deleteOneClass = async(class_id) => {
    try {        
        // const res = await axios.delete(`${prefix}/${class_id}`)
        const res = await axiosInstance.delete(`${prefix}/${class_id}`)
        console.log("deleteOneClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}