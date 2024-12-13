import axios from "axios"
import axiosInstance from "../axiosInstance"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/courts`

export const postAddCourt = async(courtList) => {
    try{
        // const res = await axios.post(`${prefix}/`, courtList)
        const res = await axiosInstance.post(`${prefix}/`, courtList)
        console.log("postAddCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListCourt = async(facility_id) => {
    try {
        // const res = await axios.get(`${prefix}/list/${facility_id}`)
        const res = await axiosInstance.get(`${prefix}/list/${facility_id}`)
        console.log("getListCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getOneCourt = async(court_id) => {
    try {
        // const res = await axios.get(`${prefix}/${court_id}`)
        const res = await axiosInstance.get(`${prefix}/${court_id}`)
        console.log("getOneCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const putOneCourt = async(facility_id, court) => {
    try {
        // const res = await axios.put(`${prefix}/${facility_id}`, court)
        const res = await axiosInstance.put(`${prefix}/${facility_id}`, court)
        console.log("putOneCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const deleteOneCourt = async(court_id) => {
    try {
        // const res = await axios.delete(`${prefix}/${court_id}`)
        const res = await axiosInstance.delete(`${prefix}/${court_id}`)
        console.log("deleteOneCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}
