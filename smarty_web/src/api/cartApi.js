import axios from "axios"

const host = "http://localhost:8080/api/cart"

const cartApi = {
    getCartItems: (user_id) => axios.get(`${host}/${user_id}`),
    addCartItem: (item) => axios.post('http://localhost:8080/api/cart', item),
    updateCartItem: (item) => axios.put('http://localhost:8080/api/cart', item),
    removeCartItem: (cart_id) => axios.delete(`${host}/${cart_id}`),
    clearCart: (user_id) => axios.delete(`${host}/clear/${user_id}`)
    
}

export default cartApi