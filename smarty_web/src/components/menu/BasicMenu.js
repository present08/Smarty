import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BasicMenu = () => {

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState('')
    // 사용자의 로그인 상태를 관리하는 상태 변수와 setter 함수
    // 사용자 이름을 관리한느 상태 변수와 setter 함수
    /**
     * setter 함수 React에서 상태(state)를 업데이트 하기 위해 사용하는 함수
     * useState를 사용할 때 상태 변수와 함께 제공되는 두 번째 요소가 바로 
     * setter 함수이다
     */

    useEffect(() => {
        try {
            const token = localStorage.getItem('token')
            const userStr = localStorage.getItem('user')

            if (token && userStr) {
                const user = JSON.parse(userStr)
                if (user) {
                    setIsLoggedIn(true)
                    setUserName(user.user_name || user.email?.split('@')[0] || '사용자')
                } 
            }
        } catch (error) {
            console.error('Error in useEffect: ', error)
            localStorage.clear()
            setIsLoggedIn(false)
            setUserName('')
        }
    }, [])
    // 로컬 스토리지(localStorage)에서 토큰(token)을 가져옴
    // 로컬 스토리지(localStorage)에서 유저(user) 정보를 가져옴
    // 토큰(token)과 유저(user) 정보가 모두 있는 경우에만 로직을 실행
    // JSON 문자열을 자바스크립트 객체로 변화
    // 유저 객체가 유효하면
    // 로그인 상태를 트루로 설정
    // 유저 네임이나 이메일 정보에서 이름을 추출하여 유저네임 상태로 설정
    // 오류 발생 시 
    // 오류를 콘솔에 출력
    // 로컬 스토리지를 초기화하여 모든 저장 정보를 삭제
    // 로그인 상태를 false로 설정
    // 유저네임을 빈 문자열로 초기화

    const handleLoginClick = () => {
        navigate('/login')
    }
    // 로그인 버튼 클릭 시 로그인 페이지로 이동

    const handleLogoutClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        setUserName('')
        navigate('/')
    }
    // 로그아웃 시 토큰을 삭제
    // 로그아웃 시 사용자 정보를 삭제
    // 로그인 상태를 false로 설정
    // 유저네임을 빈 문자열로 설정

    return (
        <nav id='navbar' className='flex bg-blue-300'>
            <div className='w-4/5 bg-gray-500'>
                <ul className='flex p-4 text-white font-bold'>
                    <li className='pr-6 text-2xl'>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className='pr-6 text-2xl'>
                        <Link to={'/product'}>Product</Link>
                    </li>
                    {isLoggedIn && (
                    <li className='pr-6 text-2xl'>
                        <Link to={'/rental'}>Rental</Link>
                    </li>
                )}
                </ul>
            </div>

            <div className='w-1/5 flex justify-end bg-orange-300 p-4 font-medium'>
                {isLoggedIn ? (
                    <div className='flex items-center'>
                        <span className='text-white text-sm mr-4 '>
                            {userName || '사용자'} 님
                        </span>
                        <button
                            onClick={handleLogoutClick}
                            className='text-white text-sm m-1 rounded hover:text-gray-200'
                        >
                            logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className='text-white text-sm m-1 rounded hover:text-gray-200'
                    >
                        login
                    </button>
                )}
            </div>
        </nav>
    )
}

export default BasicMenu