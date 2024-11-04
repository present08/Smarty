import axios from "axios"

const host = "http://localhost:8080/api/reservation"



export const getCourt = async (facility_id, court_id) =>{
    const response = await axios.get(`${host}/${facility_id}`,{params: {court_id}})
    return response.data
}

export const getReservation = async(facility_id) => {
    const response = await axios.get(`${host}/?facility_id=${facility_id}`)
    return response.data
}