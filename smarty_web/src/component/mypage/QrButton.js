import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineQrcode } from 'react-icons/ai';
import axiosInstance from '../../api/axiosInstance';
const host = 'http://localhost:8080';

const QrButton = (props) => {

    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(false);

    const fetchQRCode = async () => {
        if (!props.user.user_id) {
            console.log("사용자 ID가 없습니다. QR 코드를 가져올 수 없습니다.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            // const response = await axios.get(`${host}/api/auth/qrcode/${props.user.user_id}`, { responseType: 'arraybuffer' });
            const response = await axiosInstance.get(`/auth/qrcode/${props.user.user_id}`, { responseType: 'arraybuffer' });
            const qrCodeBlob = new Blob([response.data], { type: 'image/png' });
            const qrCodeUrl = URL.createObjectURL(qrCodeBlob);
            setQrCode(qrCodeUrl);
            setIsQrVisible(true);
        } catch (error) {
            setError('QR 코드 가져오기 실패: ' + error.message);
            console.log("QR 코드 가져오기 실패: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleQr = () => {
        setIsQrVisible(!isQrVisible);
    };

    return (
        <div>
            <button
                style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#F0F0F3',
                    color: '#003f66',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '35px',
                    fontSize: '21px',
                    filter: `
                        drop-shadow(-10px -10px 10px rgba(255, 255, 255, 0.7)) 
                        drop-shadow(10px 10px 10px rgba(174, 174, 192, 0.2))
                    `,
                    boxShadow: `
                        inset -10px -10px 10px rgba(255, 255, 255, 0.7), 
                        inset 10px 10px 10px rgba(174, 174, 192, 0.2)
                    `,
                }}
                onClick={fetchQRCode}
            >
                <AiOutlineQrcode style={{ width: '40px', height: '40px' }} />
            </button>
            {loading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            {isQrVisible && qrCode && (
                <div
                    onClick={handleToggleQr}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#eeeae6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 900,
                        flexDirection: 'column'
                    }}
                >
                    <div style={{
                        width: '300px', height: '450px', backgroundColor: '#28527a', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', boxSizing: 'border-box'
                    }}>
                        <div>
                            <img src={qrCode} alt="QR Code" style={{ width: '250px', }} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '23px', color: '#50c4d2' }}>{props.user.user_name}님의 QR코드 입니다.</h3>
                            <p style={{ padding: '20px', color: '#eeeae6' }}>QR코드를 통해 출석체크 및 로그인<br />
                                기능으로 사용 가능합니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrButton;
