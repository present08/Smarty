import axios from "axios"

const host = "http://localhost:8080/api/user/reservation"

// facility data
export const getfacilityId = async () => {
    const response = await axios.get(`${host}/`);
    return response.data
}

// btn data
export const getCourt = async (facility_id, court_id, date) => {
    const response = await axios.get(`${host}/${facility_id}`, { params: { court_id, date } })
    return response.data
}

// reservation success event( update timeLine )
export const updatePlan = async (postData, facility_id) => {
    console.log(postData)
    const response = await axios.post(`${host}/${facility_id}`, postData)
    return response.data
}