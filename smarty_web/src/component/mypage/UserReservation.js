import React, { useEffect, useState } from 'react';

const UserReservation = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [priceTotal, setPriceTotal] = useState(0); // 총 결제 금액 상태 추가

    useEffect(() => {
        setCurrentUser(props.user);
    }, [props]);

    const data = [
        { productNumber: 1, productName: '수영모', facilityName: '수영장', price: 8000 },
        { productNumber: 2, productName: '수건', facilityName: '헬스장', price: 3000 },
        { productNumber: 3, productName: '매트', facilityName: '요가', price: 6500 },
        { productNumber: 4, productName: '매트', facilityName: '요가', price: 6500 },
        { productNumber: 5, productName: '수영복', facilityName: '수영장', price: 20000 },
        { productNumber: 6, productName: '운동화', facilityName: '헬스장', price: 5000 },
        { productNumber: 7, productName: '요가복', facilityName: '요가', price: 15000 },
        { productNumber: 8, productName: '매트', facilityName: '요가', price: 6500 },
    ];

    useEffect(() => {
        const total = data.reduce((sum, item) => sum + item.price, 0);
        setPriceTotal(total);
    }, [data]);

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '65%', height: '350px',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '30px',
                alignItems: 'center',
                marginTop: '1rem'
            }}>
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>대여 및 결제 관리</h3>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ overflowY: 'auto', flex: 1, }}>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#d5deef' }}>
                                    <th style={{ width: '15%' }}>상품번호</th>
                                    <th style={{ width: '30%' }}>상품명</th>
                                    <th style={{ width: '30%' }}>시설명</th>
                                    <th style={{ width: '25%' }}>가격</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ maxHeight: '180px', overflowY: 'auto', width: '100%', borderRadius: '1opx', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <tbody>
                                    {data.map((item) => (
                                        <tr style={{ height: '50px', color: 'gray' }} key={item.productNumber}>
                                            <td style={{ width: '15%' }}>{item.productNumber}</td>
                                            <td style={{ width: '30%' }}>{item.productName}</td>
                                            <td style={{ width: '30%' }}>{item.facilityName}</td>
                                            <td style={{ width: '25%' }}>{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '18px', color: '#003f66' }}>
                        총 결제 금액: {priceTotal} 원
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReservation;
