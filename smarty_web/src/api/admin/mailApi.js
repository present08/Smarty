import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/mail`

export const getMailList = async () => {
    const res = await axios.get(`${prefix}/getList`)
    return res.data
}
