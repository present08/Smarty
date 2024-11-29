import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../css/findPassword.css';

const host = 'http://localhost:8080'

const FindPassword = () => {

    const [user_id, setUser_id] = useState('');
    const [user_name, setUser_name] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    // pw find
    const handleFindPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${host}/api/auth/find-password`, { user_id, user_name, phone })
            navigate('/user/pwchange', { state: { 'user_id': user_id } })
        } catch (err) {
            alert('맞는 회원정보가 없습니다.')
        }
    }

    return (
        <div className='findPassword_background'>
            <div className='findPassword_box'>
                <div className="findPassword-container">
                    <h1>FIND PASSWORD</h1>
                    <form onSubmit={handleFindPassword}>
                        <div>
                            <label htmlFor="user_id">USER_ID</label> <br />
                            <input
                                type="text"
                                id="user_id"
                                name='user_id'
                                value={user_id}
                                onChange={(e) => setUser_id(e.target.value)}
                                placeholder="아이디를 입력하세요."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="user_name">USER_NAME</label> <br />
                            <input
                                type="text"
                                id="user_name"
                                name='user_name'
                                value={user_name}
                                onChange={(e) => setUser_name(e.target.value)}
                                placeholder="이름을 입력하세요."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">PHONE</label> <br />
                            <input
                                type="text"
                                id="phone"
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="번호를 입력하세요."
                                required
                            />
                        </div>
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                <div className='findPassword-submenu-box'>
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
                            <Link to="/user/find-password" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px', color: '#17468c' }}>FINDPASSWORD</Link>
                        </nav>
                    </div>
                    <div className='findPassword-image-box' style={{ height: '90%' }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FindPassword;