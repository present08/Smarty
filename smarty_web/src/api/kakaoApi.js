// p408
import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const rest_api_key = `cae6b1b481f3f9314bd6f54ff85b7e63`
const redirect_uri = `http://localhost:3000/member/kakao`

const auto_code_path = `https://kauth.kakao.com/oauth/authorize`

// p413
const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {

    const kakaoURL = `${auto_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    return kakaoURL
}

export const getAccessToken = async (authCode) => {

    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)

    const accessToken = res.data.access_token

    return accessToken
}

// p419, 인가 코드를 이용하여 API 서버를 호출하는 기능
export const getMemberWithAccessToken = async (accessToken) => {

    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)
    return res.data
}