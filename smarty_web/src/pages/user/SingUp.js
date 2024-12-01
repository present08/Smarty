import React, { useEffect, useState } from 'react';
import { getFCMToken } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../api/userApi';
import '../../css/signup.css'

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
    const navigate = useNavigate();

    //영준이 코드
    const [fcmToken, setFCMToken] = useState('');
    const userData = { user_id: userId, user_name: userName, email: email, password: password, phone: phone, address: address, birthday: birthday, fcmToken: fcmToken };

    // 영준이 코드
    useEffect(() => {
        const func = async () => {
            var tk = await getFCMToken();
            setFCMToken(tk);
        };
        func();
    }, [])

    useEffect(() => {
        setEmail(email + "@" + selectEmail)
        console.log(email)
    }, [selectEmail]);


    const handleSignUp = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 리프레시 방지
        console.log('userdata', userData); // 사용자 데이터 로그 출력
        if (window.confirm("회원가입 하시겠습니까?")) { // 확인 대화상자 표시
            signUp(userData).then(e => { // 회원가입 요청
                console.log('회원가입 성공:', e); // 성공 로그 출력
                alert('회원가입이 완료되었습니다. 로그인 해주세요.'); // 성공 메시지 알림

                // 바이트 배열을 base64로 변환
                const base64String = btoa(
                    new Uint8Array(e)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                const qrCodeUrl = `data:image/png;base64,${base64String}`; // QR 코드 URL 생성
                setQrCodeUrl(qrCodeUrl); // QR 코드 URL 상태 업데이트

                setTimeout(() => { // 5초 후 로그인 페이지로 이동
                    navigate("/user/login");
                }, 3000);

            }).catch((err) => { // 에러 처리
                setError('회원가입 실패: 다시 시도해 주세요.'); // 에러 메시지 설정
                console.log(err); // 에러 로그 출력
                if (err.response.data === "UserID or UserEmail already exists.") { // 중복 체크
                    alert("ID 또는 Email 중복되었습니다 다시시도해주세요."); // 중복 메시지 알림
                }
            });
        }
    }


    return (
        <div className='signup_background' >
            <div className='signup_box' >
                <div className="signup-container" >
                    <h1 >SIGNUP</h1>
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
                                <input type="text" disabled={selectEmail !== '' ? true : false} placeholder={selectEmail} />
                                <select onChange={(e) => setSelectEmail(e.target.value)}>
                                    <option value='' >직접입력</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="google.com">google.com</option>
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
                            <label htmlFor="phone" >PHONE</label>
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

                        <div >
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
                            <img src={qrCodeUrl} alt="Generated QR Code" /> {/* QR 코드 표시 */}
                        </div>
                    )}
                </div>
                <div className='signup_submenu_box'>
                    <div>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/user/login" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>LOGIN</Link>
                            <p >&gt;</p>
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
}
export default SignUp;
