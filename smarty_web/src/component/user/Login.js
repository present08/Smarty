import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const host = 'http://localhost:8080'

const Login = () => {

    const [user_id, setUser_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [cookie, setCookie, removeCookie] = useCookies(['rememberUserId']);
    const [isRemember, setIsRemember] = useState(false);

    useEffect(() => {
        if (cookie.rememberUserId !== undefined) {
            setUser_id(cookie.rememberUserId);
            setIsRemember(true);
        }

    }, []);

    const handleCookieChange = (e) => {
        setIsRemember(e.target.checked);
        if (!e.target.checked) {
            removeCookie("rememberUserId");
        }
    }

    const moveToSingUp = () => {
        navigate("/user/signUp")
    }

    const moveTofindid = () => {
        navigate("/user/findID")
    }

    const moveTofindpassword = () => {
        navigate("/user/find-password")
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${host}/api/auth/login`, { user_id, password }, { withCredentials: true });
            // 로그인 성공 시, 토큰 저장 등 처리
            console.log('로그인 성공:', response.data);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', 'response.data');
            alert(`${response.data.user_name}님 환영합니다`)
            if (isRemember) {
                setCookie("rememberUserId", user_id)
            }
            navigate("/")
        } catch (err) {
            setError('로그인 실패:아이디 또는 비밀번호가 잘못되었습니다.');
            console.error(err);
            if (err.response.data === "Invalid user_id or password.") {
                alert("ID 또는 비밀번호 확인해주세요.")
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            height: '100vh',
            width: '100ww'
        }}>
            <div style={{
                display: 'flex',
                width: '80%',
                height: '90%',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <div className="login-container"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        paddingTop: '10%',
                        paddingLeft: '5%',
                        paddingBottom: '10%'
                    }}>
                    <h1 style={{
                        color: '#17468c',
                        fontSize: '43px',
                        paddingBottom: '20px'
                    }}>WELCOME SMARTY</h1>
                    <form onSubmit={handleLogin}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="user_id" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>USER_ID</label> <br />
                            <input
                                type="text"
                                id="user_id"
                                value={user_id}
                                onChange={(e) => setUser_id(e.target.value)}
                                placeholder="ID를 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '55px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    marginBottom: '5px'
                                }}
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginBottom: '20px'
                            }}>
                                <input
                                    type="checkbox"
                                    id='saveId'
                                    name='saveId'
                                    onChange={(e) => {
                                        handleCookieChange(e);
                                    }}
                                    checked={isRemember}
                                />{" "}
                                <label htmlFor="saveId" style={{
                                    fontSize: '15px',
                                    marginLeft: '8px'
                                }}>아이디저장</label>
                            </div>
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="password" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>USER_PASSWORD</label> <br />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '55px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '195px',
                            height: '45px',
                            backgroundColor: '#9db6cf',
                            borderRadius: '10px',
                            marginTop: '20px',
                            border: 0,
                            color: 'white',
                            fontSize: '18px',
                            marginRight: '5px',
                            fontWeight: 'bold'
                        }}>Login</button>
                        <button type="submit" onClick={moveToSingUp} style={{
                            width: '195px',
                            height: '45px',
                            backgroundColor: '#9db6cf',
                            borderRadius: '10px',
                            marginTop: '20px',
                            border: 0,
                            color: 'white',
                            fontSize: '18px',
                            marginLeft: '5px',
                            fontWeight: 'bold'
                        }}>SignUp</button>
                    </form>

                    <div style={{
                        display: 'flex',
                        marginTop: '20px',
                        width: '60%'
                    }}>
                        <button onClick={moveTofindid} style={{
                            backgroundColor: 'white',
                            border: 0,
                            fontSize: '18px',
                            color: '#9db6cf',
                            fontWeight: 'bold',
                            flex: '1'
                        }}>아이디 찾기</button>

                        <button onClick={moveTofindpassword} style={{
                            backgroundColor: 'white',
                            border: 0,
                            fontSize: '18px',
                            color: '#9db6cf',
                            fontWeight: 'bold',
                            flex: '1'
                        }}>비밀번호 찾기</button>
                    </div>
                </div>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        height: '10%'
                    }}>
                        <nav
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around', // 메뉴 항목을 좌우로 배치
                                alignItems: 'center',
                                padding: '10px 0',
                            }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px' }}>LOGIN</Link>

                        </nav>
                    </div>
                    <div style={{
                        height: '90%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



