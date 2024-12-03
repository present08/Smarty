import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080"
const prefix = `${API_SERVER_HOST}/api/admin/status`

export const getListStatus = async (facility_id) => {
    try {
        const res = await axios.get(`${prefix}/${facility_id}`)
        console.log("getListStatus : ", res.data)
        return res.data
    } catch (error) {
        console.error("ERROR! : ", error)
    }
}


// Muam e 77ㅓ
export const permissionWait = async () => {
    const response = await axios.get(`${prefix}/permission`)
    console.log(response.data)
    return response.data
}

export const permission = async (postData) => {
    console.log(postData)
    const response = await axios.post(`${prefix}/permissionPost`, postData, {headers: {
        'Content-Type': 'text/plain',  // Content-Type을 text/plain으로 설정
      }})
    return response.data;
}