import axios from "axios"

const host = "http://localhost:8080/api/user/cart"

const cartApi = {
    getCartItems: (user_id) => axios.get(`${host}/${user_id}`),
    addCartItem: (item) => axios.post(`${host}/`, item),
    updateCartItem: (item) => axios.put(`${host}/`, item),
    removeCartItem: (cart_id) => axios.delete(`${host}/${cart_id}`),
    clearCart: (user_id) => axios.delete(`${host}/clear/${user_id}`)
    
}

export default cartApi