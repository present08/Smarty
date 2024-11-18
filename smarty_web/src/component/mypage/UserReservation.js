import React, { useEffect, useState } from 'react';

const UserReservation = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [priceTotal, setPriceTotal] = useState(0); // 총 결제 금액 상태 추가

    useEffect(() => {
        setCurrentUser(props.user);
    }, [props]);

    const data = [
        { productNumber: 1, productName: '수영모', facilityName: '수영장', price: 8000 },
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
                <div style={{ display: 'flex' }}>
                    <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66', marginRight: '10px' }}>대여 및 결제 관리</h3>
                    <p style={{ color: 'gray', fontSize: '23px' }}> (총금액 : {new Intl.NumberFormat().format(priceTotal)} 원)</p>
                </div>

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
                    <div style={{ overflowY: 'auto', flex: 1, borderRadius: '1opx', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', }}>
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
                        <div style={{ maxHeight: '180px', overflowY: 'auto', width: '100%' }}>
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
                </div>
            </div>
        </div>
    );
};

export default UserReservation;
