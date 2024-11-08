import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BasicLayout from '../layouts/BasicLayout'

const LoginPage = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        user_name: '',
        password: ''
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8080/api/login', login)
            console.log('Login Response: ', response.data)

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token)

                const userData = {
                    ...response.data.user,
                    user_name: response.data.user.user_name || response.data.user.email?.split('@')[0] || '사용자'
                }
                
                localStorage.setItem('user', JSON.stringify(userData))

                console.log('Stored user: ', localStorage.getItem('user'))

                navigate('/')
            } else {
                setError('로그인 응답 데이터가 올바르지 않습니다')
            }
        } catch (error) {
            console.error('Login Error', error)
            setError(error.response?.data?.message || '로그인 실패')
        }
    }
    return (
        <BasicLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            로그인
                        </h2>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="user_name" className="sr-only">아이디</label>
                                <input
                                    id="user_name"
                                    name="user_name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="아이디"
                                    value={login.user_name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">비밀번호</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="비밀번호"
                                    value={login.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                로그인
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BasicLayout>
    )
}

export default LoginPage