import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/courts`

export const postAddClass = async(courtList) => {
    try{
        const res = await axios.post(`${prefix}/`, courtList)
        console.log("postAddClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListClass = async() => {
    try {
        const res = await axios.get(`${prefix}/list`)
        console.log("getListClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR ! : ", error)
    }
}

// export const getOneClass = async(court_id) => {
//     const res = await axios.get(`${prefix}/${court_id}`)
//     return res.data
// }

// export const putOneClass = async(court_id, court) => {
//     const res = await axios.put(`${prefix}/${court_id}`, court)
//     return res.data
// }

// export const deleteOneClass = async(court_id) => {
//     const res = await axios.delete(`${prefix}/${court_id}`)
//     return res.data
// }