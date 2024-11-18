import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/products`

export const postAddProduct = async(product) => {
    try {
        const header = {headers: {"Content-Type": "multipart/form-data"}}
        const res = await axios.post(`${prefix}/`, product, header)
        console.log("postAddProduct : ", res)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListProduct = async() => {
    try {
        const res = await axios.get(`${prefix}/list`)
        console.log("getListProduct : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR ! : ", error)
    }
}

// export const getOneProduct = async(product_id) => {
//     const res = await axios.get(`${prefix}/${product_id}`)
//     return res.data
// }

// export const putOneProduct = async(product_id, product) => {
//     const header = {headers: {"Content-Type": "multipart/form-data"}}
//     const res = await axios.put(`${prefix}/${product_id}`, product, header)
//     return res.data
// }

// export const deleteOneProduct = async(product_id) => {
//     const res = await axios.delete(`${prefix}/${product_id}`)
//     return res.data
// }
