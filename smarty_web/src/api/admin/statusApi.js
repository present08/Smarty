import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/status`

export const getListStatus = async(facility_id, date) => {
    console.log("보내는 값 확인 : ", date)
    try {
        const res = await axios.get(`${prefix}/${facility_id}`, {params: {date}})
        console.log("getListStatus : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}