import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../../css/findID.css';

const host = 'http://localhost:8080'

const FindID = () => {

    const [email, setEmail] = useState('');
    const [user_name, setUser_name] = useState('');
    const navigate = useNavigate();

    const handleFindID = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${host}/api/auth/findID`, { email, user_name });
            alert('ID : ' + response.data.userID);
            navigate("/user/login");
        } catch (err) {
            alert('회원정보가 존재하지않습니다.')
        }
    }


    return (

        <div className='findID_background'>
            <div className='findID_box'>
                <div className="findId-container">
                    <h1>FIND ID</h1>
                    <form onSubmit={handleFindID}>
                        <div>
                            <label htmlFor="email">EMAIL</label> <br />
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="user_name">USER_NAME</label> <br />
                            <input
                                type="text"
                                id="user_name"
                                value={user_name}
                                onChange={(e) => setUser_name(e.target.value)}
                                placeholder="이름을 입력하세요."
                                required
                            />
                        </div>
                        <button type="submit">SEARCH</button>
                    </form>
                </div>
                <div className='findID_submenu_box'>
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
                            <Link to="/user/findID" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px', color: '#17468c' }}>FINDID</Link>
                        </nav>
                    </div>
                    <div className='findID_image_box' style={{ height: '90%', }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FindID


