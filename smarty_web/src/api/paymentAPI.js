import axios from "axios";

const host = "http://localhost:8080/api/payment";

export const createPayment = async (paymentData) => {
    const response = await axios.post(`${host}/create`, paymentData)
    return response.data;
};

export const approvePayment = async (payment_id) => {
  const response = await axios.put(`${host}/approve/${payment_id}`)
  return response.data  
}

export const getPaymentById = async (payment_id) => {
    const response = await axios.get(`${host}/${payment_id}`)
    return response.data
}
