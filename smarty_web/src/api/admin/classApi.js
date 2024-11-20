import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/classes`

export const postAddClass = async(classList) => {
    try{
        const res = await axios.post(`${prefix}/`, classList)
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

export const getOneClass = async(court_id) => {
    try {        
        const res = await axios.get(`${prefix}/${court_id}`)
        console.log("getOneClass : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR ! : ", error)
    }
}

// export const putOneClass = async(court_id, court) => {
//     const res = await axios.put(`${prefix}/${court_id}`, court)
//     return res.data
// }

// export const deleteOneClass = async(court_id) => {
//     const res = await axios.delete(`${prefix}/${court_id}`)
//     return res.data
// }