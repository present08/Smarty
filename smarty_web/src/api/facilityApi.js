import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/facilities`

export const postAdd = async(facility) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.post(`${prefix}/`, facility, header)
    console.log(res)
    return res.data
}

export const getList = async() => {
    const res = await axios.get(`${prefix}/list`)
    return res.data
}

export const getOne = async(facility_id) => {
    const res = await axios.get(`${prefix}/${facility_id}`)
    return res.data
}

export const putOne = async(facility_id, facility) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.put(`${prefix}/${facility_id}`, facility, header)
    return res.data
}

export const deleteOne = async(facility_id) => {
    const res = await axios.delete(`${prefix}/${facility_id}`)
    return res.data
}