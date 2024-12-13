import axios from "axios"
import axiosInstance from "./axiosInstance";

const host = "http://localhost:8080/api/user/cart"

const cartApi = {
    // getCartItems: (user_id) => axios.get(`${host}/${user_id}`),
    // addCartItem: (item) => axios.post('http://localhost:8080/api/user/cart', item),
    // updateCartItem: (item) => axios.put('http://localhost:8080/api/user/cart', item),
    // removeCartItem: (cart_id) => axios.delete(`${host}/${cart_id}`),
    // clearCart: (user_id) => axios.delete(`${host}/clear/${user_id}`)
    getCartItems: (user_id) => axiosInstance.get(`${host}/${user_id}`),
    addCartItem: (item) => axiosInstance.post('http://localhost:8080/api/user/cart', item),
    updateCartItem: (item) => axiosInstance.put('http://localhost:8080/api/user/cart', item),
    removeCartItem: (cart_id) => axiosInstance.delete(`${host}/${cart_id}`),
    clearCart: (user_id) => axiosInstance.delete(`${host}/clear/${user_id}`)
    
}

export default cartApi