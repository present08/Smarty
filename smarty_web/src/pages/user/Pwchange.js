import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/pwchange.css';

const host = 'http://localhost:8080'

const Pwchange = () => {

    const [password, setPassword] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const location = useLocation();
    const user_id = location.state.user_id;
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();


        if (password === pwConfirm) {
            try {
                const response = await axios.post(`${host}/api/auth/pwchange`, { user_id, password })
                alert("변경이완료되었습니다. 다시 로그인해주세요.")
                navigate("/user/login");

            } catch (err) {
                alert('맞는 회원정보가 없습니다.')
            }
        } else {
            alert('비밀번호가 일치하지않습니다. 다시확인해주세요.')
        }

    }

    return (
        <div className='pwchange-background'>
            <div className='pwchange-box'>
                <div className="pwchange-container">
                    <h1>FIND PASSWORD</h1>
                    <div>
                        <p>회원님의 아이디는 <span>"{user_id}"</span> 입니다.</p>
                        <p>비밀번호를 변경해주세요.</p>
                    </div>
                    <form onSubmit={handleChangePassword}>
                        <div>
                            <label htmlFor="password">password</label> <br />
                            <input
                                type="password"
                                id="password"
                                name='password'
                                value={password}
                                placeholder="새로운 비밀번호를 입력하세요."
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="pw">password check</label> <br />
                            <input
                                type="password"
                                id="pwConfirm"
                                name='pwConfirm'
                                placeholder="다시 한번더 입력하세요."
                                value={pwConfirm}
                                onChange={(e) => setPwConfirm(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">search</button>
                    </form>
                </div>
                <div className='pwchange-submenu-box'>
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
                            <Link to="/user/find-password" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>FINDPASSWORD</Link>
                            <p >&gt;</p>
                            <Link to="/user/pwchange" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px', color: '#17468c' }}>CHANGEPASSWORD</Link>

                        </nav>
                    </div>
                    <div className='pwchange-img-box' style={{
                        height: '90%',
                    }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pwchange

