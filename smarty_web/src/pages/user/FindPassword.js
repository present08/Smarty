import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

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
                    }}>FIND PASSWORD</h1>
                    <form onSubmit={handleFindPassword}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="user_id" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>USER_ID</label> <br />
                            <input
                                type="text"
                                id="user_id"
                                name='user_id'
                                value={user_id}
                                onChange={(e) => setUser_id(e.target.value)}
                                placeholder="아이디를 입력하세요."
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
                                name='user_name'
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
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="phone" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>PHONE</label> <br />
                            <input
                                type="text"
                                id="phone"
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="번호를 입력하세요."
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
                            <Link to="/user/find-password" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px' }}>FINDPASSWORD</Link>

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

export default FindPassword