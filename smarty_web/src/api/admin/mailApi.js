import axiosInstance from "../axiosInstance";

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/mail`

export const getMailList = async () => {
    const res = await axiosInstance.get(`${prefix}/getList`)
    return res.data
}

export const sendMail = async (mailData) => {
    const response = await axiosInstance.post(`${prefix}/sendMail`, mailData, {
    });
    return response.data;
};