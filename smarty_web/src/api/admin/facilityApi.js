import axios from "axios"
import axiosInstance from "../axiosInstance"
export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/facilities`

export const postAddFacility = async(facility) => {
    try {
        const header = {headers: {"Content-Type": "multipart/form-data"}}
        // const res = await axios.post(`${prefix}/`, facility, header)
        const res = await axiosInstance.post(`${prefix}/`, facility, header)
        console.log("postAddFacility : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListFacility = async() => {
    try {
        // const res = await axios.get(`${prefix}/list`)
        const res = await axiosInstance.get(`${prefix}/list`)
        console.log("getListFacility : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getOneFacility = async(facility_id) => {
    try {
        // const res = await axios.get(`${prefix}/${facility_id}`)
        const res = await axiosInstance.get(`${prefix}/${facility_id}`)
        console.log("getOneFacility : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const putOneFacility = async(facility_id, facility) => {
    try {
        const header = {headers: {"Content-Type": "multipart/form-data"}}
        // const res = await axios.put(`${prefix}/${facility_id}`, facility, header)
        const res = await axiosInstance.put(`${prefix}/${facility_id}`, facility, header)
        console.log("putOneFacility : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const deleteOneFacility = async(facility_id) => {
    try {
        // const res = await axios.delete(`${prefix}/${facility_id}`)
        const res = await axiosInstance.delete(`${prefix}/${facility_id}`)
        console.log("deleteOneFacility : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ",  error)
    }
}
