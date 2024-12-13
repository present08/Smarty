import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/security`;

export const securitySignUp = async (userData) => {
    try{
        const res = await axios.post(`${prefix}/register`, userData, { responseType: 'arraybuffer' })
        console.log("securitySignUp : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const securityLogin = async (user_id, password) => {
    try{
        const res = await axios.post(`${prefix}/login`, { user_id, password }, { withCredentials: true })
        console.log("securityLogin : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const securityStatus = async () => {
    try{
        const res = await axios.get(`${prefix}/status`, { withCredentials: true })
        console.log("securityStatus : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
};