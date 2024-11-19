import React, { useEffect, useState } from 'react';
import { getProductRentalUser } from '../../api/rentalAPI';
import '../../css/userReservation.css';
import { IoClose } from "react-icons/io5";

const UserReservation = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [rentalData, setRentalData] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const modalOpen = (product) => {
        setSelectedProduct(product);
        setModal(true); // 모달 열기
    };

    const modalClose = () => {
        setModal(false); // 모달 닫기
        setSelectedProduct(null); // 선택한 상품 초기화
    };

    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);
            const fetchRentalData = async () => {
                try {
                    const userId = props.user.user_id;
                    const response = await getProductRentalUser(userId);

                    if (Array.isArray(response)) {
                        const formattedData = response.map(item => ({
                            productNum: item.product_id,
                            productName: item.product_name,
                            productPrice: item.price,
                            productSize: item.size,
                            facilityName: item.facility_name,
                            rentalDate: item.rental_date,
                            returnDate: item.return_date,
                            userName: item.user_name,
                            userId: item.user_id
                        }));
                        setRentalData(formattedData);

                        const total = formattedData.reduce((sum, item) => sum + item.productPrice, 0);
                        setPriceTotal(total);
                    } else {
                        console.error('Response is not an array:', response);
                    }
                } catch (error) {
                    console.error('Error in fetchRentalData:', error);
                }
            };

            fetchRentalData();
        } else {
            console.log('No user data available:', currentUser);
        }
    }, [props]);

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
                backgroundColor: '#f7f7f7',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ overflowY: 'auto', flex: 1, borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', }}>
                        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#d5deef' }}>
                                    <th style={{ width: '25%' }}>상품번호</th>
                                    <th style={{ width: '20%' }}>상품명</th>
                                    <th style={{ width: '20%' }}>시설명</th>
                                    <th style={{ width: '25%' }}>가격</th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{ maxHeight: '180px', overflowY: 'auto', width: '100%' }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <tbody>
                                    {rentalData.map((item) => (
                                        <tr onClick={() => modalOpen(item)} style={{ height: '50px', color: 'gray', cursor: 'pointer' }} key={item.productNum}>
                                            <td style={{ width: '25%', textAlign: 'center' }}>{item.productNum}</td>
                                            <td style={{ width: '20%', textAlign: 'center' }}>{item.productName}</td>
                                            <td style={{ width: '20%', textAlign: 'center' }}>{item.facilityName}</td>
                                            <td style={{ width: '25%', textAlign: 'center' }}>
                                                {new Intl.NumberFormat().format(item.productPrice)}원
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {modal && (
                            <div className='reservationModalContainer'>
                                <div className='reservationbuttonBox' onClick={modalClose}>
                                    <IoClose style={{ width: '40px', height: '40px' }} />
                                </div>
                                <div className='reservationModalBox'>
                                    {selectedProduct && (
                                        <div>
                                            <h4>{selectedProduct.productName}</h4>
                                            <p>상품번호: {selectedProduct.productNum}</p>
                                            <p>ID: {selectedProduct.userId}</p>
                                            <p>이름: {selectedProduct.userName}</p>
                                            <p>가격: {new Intl.NumberFormat().format(selectedProduct.productPrice)} 원</p>
                                            <p>상품사이즈: {selectedProduct.productSize}</p>
                                            <p>시설명: {selectedProduct.facilityName}</p>
                                            <p>대여일: {selectedProduct.rentalDate}</p>
                                            <p>반납일: {selectedProduct.returnDate}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserReservation;
