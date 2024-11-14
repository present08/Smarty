import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
                        paddingBottom: '10px'
                    }}>FIND PASSWORD</h1>
                    <h4>UserID: {user_id}</h4>
                    <form onSubmit={handleChangePassword}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="password" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>password</label> <br />
                            <input
                                type="password"
                                id="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <label htmlFor="pw" style={{
                                fontSize: '20px',
                                color: 'gray',
                                display: 'block'
                            }}>password check</label> <br />
                            <input
                                type="password"
                                id="pwConfirm"
                                name='pwConfirm'
                                value={pwConfirm}
                                onChange={(e) => setPwConfirm(e.target.value)}
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
                        }}>search</button>
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
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                padding: '10px 0',
                            }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
                            <Link to="/user/find-password" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>FINDPASSWORD</Link>
                            <p >&gt;</p>
                            <Link to="/user/pwchange" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px' }}>CHANGEPASSWORD</Link>

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

export default Pwchange

