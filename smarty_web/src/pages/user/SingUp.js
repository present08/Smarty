import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/userApi';
import '../../css/signup.css';
import { securitySignUp } from '../../api/securityApi';


const SignUp = () => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 필드 추가
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [selectEmail, setSelectEmail] = useState('');
    const navigate = useNavigate();

    
    // 이메일 유효성 검사
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const fullEmail = email + (selectEmail ? "@" + selectEmail : "");
        if (!isEmailValid(fullEmail)) {
            alert("유효한 이메일 주소를 입력하세요.");
            return;
        }

        const userData = {
            user_id: userId,
            user_name: userName,
            email: fullEmail,
            password: password,
            phone: phone,
            address: address,
            birthday: birthday,
        };

        if (window.confirm("회원가입 하시겠습니까?")) {
            securitySignUp(userData).then(response => { // 시큐리티 방식
            // signUp(userData).then(response => {  // 세션 방식
                console.log('회원가입 성공:', response);
                alert('회원가입이 완료되었습니다. 로그인 해주세요.');

                const base64String = btoa(
                    new Uint8Array(response)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                const qrCodeUrl = `data:image/png;base64,${base64String}`;
                setQrCodeUrl(qrCodeUrl);

                setTimeout(() => {
                    navigate("/user/login");
                }, 4000);
            }).catch((err) => {
                setError('회원가입 실패: 다시 시도해 주세요.');
                console.log(err);
                if (err.response && err.response.data === "UserID or UserEmail already exists.") {
                    alert("ID 또는 Email 중복되었습니다. 다시 시도해주세요.");
                }
            });
        }
    };

    return (
        <div className='signup_background'>
            <div className='signup_box'>
                <div className="signup-container">
                    <h1>SIGNUP</h1>
                    <form onSubmit={handleSignUp}>
                        <div>
                            <label htmlFor="user_id">USER_ID</label>
                            <input
                                type="text"
                                id="user_id"
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="아이디를 입력하세요."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="user_name">USER_NAME</label>
                            <input
                                type="text"
                                id="user_name"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름을 입력하세요."
                                required
                            />
                        </div>

                        <div className='email_box'>
                            <label htmlFor="email">EMAIL</label>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일을 입력하세요."
                                    required
                                />@
                                <input type="text" disabled={selectEmail ? true : false} placeholder={selectEmail} />
                                <select onChange={(e) => setSelectEmail(e.target.value)}>
                                    <option value=''>직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="gmail.com">gmail.com</option>
                                    {/* 위 부분 google.com 이 아니라 gmail.com 이 맞는거라서 김영준이 수정함 */}
                                    <option value="daum.net">daum.net</option>
                                    <option value="nate.com">nate.com</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password">PASSWORD</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                id="confirm_password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="비밀번호를 확인하세요."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone">PHONE</label>
                            <input
                                type="text"
                                id="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="휴대번호를 입력하세요."
                            />
                        </div>

                        <div>
                            <label htmlFor="address">ADDRESS</label>
                            <input
                                type="text"
                                id="address"
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="주소를 입력하세요."
                            />
                        </div>

                        <div>
                            <label htmlFor="birthday">BIRTHDAY</label>
                            <input
                                type="date"
                                id="birthday"
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </div>
                        <button type="submit">SIGNUP</button>
                    </form>
                    {/* QR 코드 이미지 표시 부분 */}
                    {qrCodeUrl && (
                        <div className='qr_box'>
                            <img src={qrCodeUrl} alt="Generated QR Code" />
                            <p>QR 코드가 생성되었습니다.</p>
                        </div>
                    )}
                </div>
                <div className='signup_submenu_box'>
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p>&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p>&gt;</p>
                            <Link to="/user/signUp" style={{ textDecoration: 'none', color: 'black', padding: '10px', marginRight: '10px', color: '#17468c' }}>SIGNUP</Link>
                        </nav>
                    </div>
                    <div className='signup_image_box' style={{ height: '90%' }}>
                        <img className='img-move' src="/football-team-20.png" alt="이미지" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
