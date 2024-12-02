import React, { useEffect, useState } from 'react';
import { getFCMToken } from '../../firebase';

import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/userApi';
//import { useFCM } from '../../context/FCMContext';


const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState(''); // QR 코드 URL 상태
    const [selectEmail, setSelectEmail] = useState('');
    const [fcmToken, setFCMToken] = useState('');
    const userData = { user_id: userId, user_name: userName, email: email, password: password, phone: phone, address: address, birthday: birthday, fcm_token: fcmToken };

    const navigate = useNavigate();

    useEffect(() => {
        setEmail(email + "@" + selectEmail)
        console.log(email)
    }, [selectEmail]);

    useEffect(() => {
        const func = async () => {
            var tk = await getFCMToken();
            setFCMToken(tk);
        };
        func();
    }, [])

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('userdata', userData);
        if (window.confirm("회원가입 하시겠습니까?")) {
            signUp(userData).then(e => {
                console.log('회원가입 성공:', e);
                alert('회원가입이 완료되었습니다. 로그인 해주세요.');

                // 바이트 배열을 base64로 변환
                const base64String = btoa(
                    new Uint8Array(e)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                const qrCodeUrl = `data:image/png;base64,${base64String}`;
                setQrCodeUrl(qrCodeUrl); // QR 코드 URL 상태 업데이트

                setTimeout(() => {
                    navigate("/user/login");
                }, 5000);

            }).catch((err) => {
                setError('회원가입 실패: 다시 시도해 주세요.');
                console.log(err)
                if (err.response.data === "UserID or UserEmail already exists.") {
                    alert("ID 또는 Email 중복되었습니다 다시시도해주세요.");
                }
            })
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
                <div className="signup-container" style={{
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
                        paddingBottom: '5px',
                        margin: 0
                    }}>SIGNUP</h1>
                    <form onSubmit={handleSignUp}>
                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="user_id" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>USER_ID</label>
                            <input
                                type="text"
                                id="user_id"
                                // value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="아이디를 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="user_name" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>USER_NAME</label>
                            <input
                                type="text"
                                id="user_name"
                                // value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름을 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="email" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>EMAIL</label>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일을 입력하세요."
                                    required
                                    style={{
                                        width: '170px',
                                        height: '40px',
                                        marginBottom: '10px',
                                        border: 0,
                                        backgroundColor: '#f2f3f4',
                                        borderRadius: '10px',
                                        paddingLeft: '10px'
                                    }}
                                />@
                                <input type="text" disabled={selectEmail !== '' ? true : false}
                                    placeholder={selectEmail}
                                    style={{
                                        width: '100px',
                                        height: '40px',
                                        marginLeft: '10px',
                                        borderRadius: '10px',
                                        backgroundColor: '#f2f3f4',
                                        border: 0,
                                    }} />
                                <select onChange={(e) => setSelectEmail(e.target.value)} style={{
                                    width: '100px',
                                    height: '40px',
                                    marginLeft: '10px',
                                    borderRadius: '10px',
                                    backgroundColor: '#f2f3f4',
                                    border: 0,
                                }}>
                                    <option value='' >직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="google.com">google.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="nate.com">nate.com</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="password" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>PASSWORD</label>
                            <input
                                type="password"
                                id="password"
                                // value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                                required
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="phone" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>PHONE</label>
                            <input
                                type="text"
                                id="phone"
                                // value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="휴대번호를 입력하세요."
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="address" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>ADDRESS</label>
                            <input
                                type="text"
                                id="address"
                                // value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="주소를 입력하세요."
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px'
                                }}
                            />
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            <label htmlFor="birthday" style={{
                                fontSize: '15px',
                                color: 'gray',
                                display: 'block',
                                paddingBottom: '10px'
                            }}>BIRTHDAY</label>
                            <input
                                type="date"
                                id="birthday"
                                // value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                style={{
                                    width: '400px',
                                    height: '40px',
                                    marginBottom: '10px',
                                    border: 0,
                                    backgroundColor: '#f2f3f4',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px'
                                }}
                            />
                        </div>
                        <button type="submit" style={{
                            width: '195px',
                            height: '40px',
                            backgroundColor: '#9db6cf',
                            borderRadius: '10px',
                            marginTop: '20px',
                            border: 0,
                            color: 'white',
                            fontSize: '18px',
                            marginRight: '5px',
                            fontWeight: 'bold'
                        }}>SIGNUP</button>
                    </form>
                    {/* QR 코드 이미지 표시 부분 */}
                    {qrCodeUrl && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}>
                            <img src={qrCodeUrl} alt="Generated QR Code" style={{ width: '80%', height: '80%', maxWidth: '400px', maxHeight: '400px' }} /> {/* QR 코드 표시 */}
                        </div>
                    )}
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
                            <Link to="/user/signUp" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px' }}>SIGNUP</Link>

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
}
export default SignUp;
