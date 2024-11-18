import axios from "axios"

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/courts`

export const postAddCourt = async(courtList) => {
    try{
        const res = await axios.post(`${prefix}/`, courtList)
        console.log("postAddCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR! : ", error)
    }
}

export const getListCourt = async() => {
    try {
        const res = await axios.get(`${prefix}/list`)
        console.log("getListCourt : ", res.data)
        return res.data
    } catch(error) {
        console.error("ERROR ! : ", error)
    }
}

// export const getOneCourt = async(court_id) => {
//     const res = await axios.get(`${prefix}/${court_id}`)
//     return res.data
// }

// export const putOneCourt = async(court_id, court) => {
//     const res = await axios.put(`${prefix}/${court_id}`, court)
//     return res.data
// }

// export const deleteOneCourt = async(court_id) => {
//     const res = await axios.delete(`${prefix}/${court_id}`)
//     return res.data
// }
