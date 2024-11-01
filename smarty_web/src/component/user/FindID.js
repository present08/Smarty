import { tab } from '@testing-library/user-event/dist/tab';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
            navigate("/login");
        } catch (err) {
            alert('회원정보가 존재하지않습니다.')
        }
    }


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
                <div className="login-container" style={{
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
                        color: '#9db6cf',
                        fontSize: '40px',
                        paddingBottom: '20px'
                    }}>FIND ID</h1>

                    <form onSubmit={handleFindID}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="email" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>EMAIL</label> <br />
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '55px',
                                    marginBottom: '20px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="user_name" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>USER_NAME</label> <br />
                            <input
                                type="text"
                                id="user_name"
                                value={user_name}
                                onChange={(e) => setUser_name(e.target.value)}
                                placeholder="이름을 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '55px',
                                    marginBottom: '20px',
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
                        }}>SEARCH</button>
                    </form>
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
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
                            <Link to="/user/findID" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px' }}>FINDID</Link>

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
    )
}

export default FindID


