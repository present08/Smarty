import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/status`

export const getListStatus = async(facility_id, date) => {
    try {
        const res = await axios.get(`${prefix}/${facility_id}`, {params: {date}})
        console.log("getListStatus : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListAttendance = async(class_id, date) => {
    try {
        const res = await axios.get(`${prefix}/attendance/${class_id}`, {params: {date}})
        console.log("getListAttendance : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListUser = async(date) => {
    try {
        const res = await axios.get(`${prefix}/user`, {params: {date}})
        console.log("getListUser : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}