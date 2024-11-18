import axios from "axios";

const host = "http://localhost:8080/api/user/class"

export const getClass = async () => {
    const response = await axios.get(`${host}/`)
    return response.data
}

export const classEnroll = async (enrollData) => {
    const response = await axios.post(`${host}/enroll`, enrollData)
    return response.data
}