import axios from "axios";

const host = "http://localhost:8080/api/product"

export const getFaility = async () => {
    const response = await axios.get(`${host}/facility`)
    return response.data
}

export const getProduct = async () => {
    const response = await axios.get(`${host}/products`)
    return response.data
}