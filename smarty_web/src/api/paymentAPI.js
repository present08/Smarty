import axios from "axios";
import axiosInstance from "./axiosInstance";
const host = "http://localhost:8080/api/user/payment";

export const createPayment = async (paymentData) => {
  // const response = await axios.post(`${host}/create`, paymentData)
  const response = await axiosInstance.post(`${host}/create`, paymentData)
  return response.data;
};

export const approvePayment = async (payment_id) => {
  // const response = await axios.put(`${host}/approve/${payment_id}`)
  const response = await axiosInstance.put(`${host}/approve/${payment_id}`)
  return response.data
}

export const getPaymentById = async (payment_id) => {
  // const response = await axios.get(`${host}/${payment_id}`)
  const response = await axiosInstance.get(`${host}/${payment_id}`)
  return response.data
}

export const handlePayment = async () => {
  const paymentData = {
    reservation_id: "RES123",
    amount: 1000
  };

  try {
    // const response = await axios.post("http://localhost:8080/api/payment/user/create", paymentData)
    const response = await axiosInstance.post("http://localhost:8080/api/payment/user/create", paymentData)
    console.log(response.data)
  } catch (error) {
    console.error(error.response.data)
  }
}


// resservation Payment
export const reserpayment = async (postData) => {
  console.log("전송 데이터 확인 ", postData)
  // const response = await axios.post(`${host}/reservation`, postData);
  const response = await axiosInstance.post(`${host}/reservation`, postData);
  return response.data;
}

// enrollment Payment
export const enrollpayment = async (postData) => {
  // const response = await axios.post(`${host}/enrollment`, postData);
  const response = await axiosInstance.post(`${host}/enrollment`, postData);
  return response.data;
}
