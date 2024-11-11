import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/facilities`

export const postAddFacility = async(facility) => {
    try {
        console.log("시설 전송 : ", facility)
        const header = {headers: {"Content-Type": "multipart/form-data"}}
        const res = await axios.post(`${prefix}/`, facility, header)
        console.log("서버 응답 : ", res)
        return res.data
    } catch(error) {
        console.error("에러 발생 : ", error)
    }
}

export const getListFacility = async() => {
    const res = await axios.get(`${prefix}/list`)
    return res.data
}

export const getOneFacility = async(facility_id) => {
    const res = await axios.get(`${prefix}/${facility_id}`)
    return res.data
}

export const putOneFacility = async(facility_id, facility) => {
    const header = {headers: {"Content-Type": "multipart/form-data"}}
    const res = await axios.put(`${prefix}/${facility_id}`, facility, header)
    return res.data
}

export const deleteOneFacility = async(facility_id) => {
    const res = await axios.delete(`${prefix}/${facility_id}`)
    return res.data
}