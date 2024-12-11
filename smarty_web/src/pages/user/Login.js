import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { login } from '../../api/userApi';
import '../../css/login.css'
import { securityLogin } from '../../api/securityApi';


const Login = () => {

    const [user_id, setUser_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //----------------------------------세션 방식 로그인--------------------------------------//
    const [cookie, setCookie, removeCookie] = useCookies(['rememberUserId']);
    const [isRemember, setIsRemember] = useState(false);

    // useEffect(() => {
    //     if (cookie.rememberUserId !== undefined) {
    //         setUser_id(cookie.rememberUserId);
    //         setIsRemember(true);
    //     }

    // }, []);

    // const handleCookieChange = (e) => {
    //     setIsRemember(e.target.checked);
    //     if (!e.target.checked) {
    //         removeCookie("rememberUserId");
    //     }
    // }

    const moveToSingUp = () => {
        navigate("/user/signUp")
    }

    const moveTofindid = () => {
        navigate("/user/findID")
    }

    const moveTofindpassword = () => {
        navigate("/user/find-password")
    }

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     login(user_id, password).then(e => {
    //         // 로그인 성공 시, 토큰 저장 등 처리
    //         console.log('로그인 성공:', e);
    //         // localStorage.setItem('isLoggedIn', 'true');
    //         // localStorage.setItem('user', JSON.stringify(e));
    //         alert(`${e.user_name}님 환영합니다`)
    //         // if (isRemember) {
    //         //     setCookie("rememberUserId", user_id)
    //         // }
    //         navigate("/")
    //     }).catch((err) => {
    //         setError('로그인 실패:아이디 또는 비밀번호가 잘못되었습니다.');
    //         console.error(err);
    //         if (err.response.data === "Invalid user_id or password.") {
    //             alert("ID 또는 비밀번호 확인해주세요.")
    //         }
    //     })
    // }
    //---------------------------------------------------------------------------------------//

    //-----------------------------------시큐리티 로그인--------------------------------------//
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 시큐리티 로그인 API 호출
            const response = await securityLogin(user_id, password);
            console.log('로그인 성공:', response);

            // localStorage 저장
            localStorage.setItem('jwtToken', response.token);
            localStorage.setItem('user', JSON.stringify(response.user.userVO));
            localStorage.setItem('isLoggedIn', 'true');

            // 사용자 이름 환영 메시지
            alert(`${response.user.userVO.user_name}님 환영합니다!`);

            // 로그인 후 홈으로 이동
            navigate('/');
        } catch (err) {
            setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
            console.error(err);
        }
    };
    //---------------------------------------------------------------------------------------//

    return (
        <div className='login_background'>
            <div className='login-box'>
                <div className="login-container">
                    <h1>WELCOME SMARTY</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="user_id">USER_ID</label> <br />
                            <input
                                type="text"
                                id="user_id"
                                value={user_id}
                                onChange={(e) => setUser_id(e.target.value)}
                                placeholder="ID를 입력하세요."
                                required
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    id='saveId'
                                    name='saveId'
                                    // onChange={(e) => {
                                    //     handleCookieChange(e);
                                    // }}
                                    checked={isRemember}
                                />{" "}
                                <label htmlFor="saveId">아이디저장</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password">USER_PASSWORD</label> <br />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                                required
                            />
                        </div>
                        <button type="submit" >Login</button>
                        <button type="submit" onClick={moveToSingUp}>SignUp</button>
                    </form>

                    <div className='login_text_box'>
                        <button onClick={moveTofindid}>아이디 찾기</button>
                        <button onClick={moveTofindpassword}>비밀번호 찾기</button>
                    </div>
                </div>
                <div className="login_submenu_box">
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px', color: '#17468c', }}>LOGIN</Link>
                        </nav>
                    </div>
                    <div className='login_image_box' style={{ height: '90%' }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;



