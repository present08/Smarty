import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/status`

export const getListStatus = async(facility_id) => {
    try {
        const res = await axios.get(`${prefix}/${facility_id}`)
        console.log("getListStatus : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}