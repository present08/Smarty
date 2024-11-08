import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})
// axios 인스턴스를 생성하고 기본 URL을 설정

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
// 로컬 스토리지(localStorage)에서 토큰(token) 값을 가져옴
// 토큰이 있는 경우
// 요청 헤더에 Authorization에 Bearer {token} 형식으로 토큰을 추가
// 수정된 요청 설정(config)을 반환, 다음 요청으로 전당
api.interceptors.response.use( 
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)
// 응답이 성공적이면, 응답을 그대로 반환
// 응답의 상태 코드가 401(인증실패)일 경우
// 로컬 스토리지(localStorage)에서 토큰(token) 삭제
// 로컬 스토리지(localStorage)에서 유저(user) 삭제
// 로그인 페이지로 리다이렉트
// 에러가 발생하면, 그 에러를 반환하여 거부

export default api