import React, { useState } from 'react';
import axios from 'axios';

const host = 'http://localhost:8080';

const QrButton = ({ userId }) => {
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isQrVisible, setIsQrVisible] = useState(false);

    const fetchQRCode = async () => {
        if (!userId) {
            console.log("사용자 ID가 없습니다. QR 코드를 가져올 수 없습니다.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`${host}/api/auth/qrcode/${userId}`, { responseType: 'arraybuffer' });
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
                QR
            </button>
            {loading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            {isQrVisible && qrCode && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 900,
                    }}
                >
                    <div
                        style={{
                            width: '70%',
                            height: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                        }}
                    >
                        <img src={qrCode} alt="QR Code" style={{ width: '35%', height: '60%' }} />
                        <button
                            onClick={handleToggleQr}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                padding: '10px 20px',
                                backgroundColor: '#ffffff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QrButton;
