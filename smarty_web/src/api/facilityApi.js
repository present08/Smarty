import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/facility`

export const getList = async() => {
    const res = await axios.get(`${prefix}/list`)
    return res.data
}

export const postAdd = async(facility) => {
    const headers = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.post(`${prefix}/`, facility, headers)
    return res.data
}