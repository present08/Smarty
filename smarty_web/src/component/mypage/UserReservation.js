import React, { useEffect, useState } from 'react';
import { getProductRentalUser } from '../../api/userApi';
import '../../css/userReservation.css';
import { Link } from 'react-router-dom';

const UserReservation = (props) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [rentalData, setRentalData] = useState([]);
    const [priceTotal, setPriceTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const modalOpen = (product) => {
        setSelectedProduct(product);
        setModal(true);
    };

    const modalClose = () => {
        setModal(false);
        setSelectedProduct(null);
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

                        // 상태 초기화
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
    }, [props.user]);

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
                alignItems: 'flex-start',
                overflowY: 'auto',
            }}>
                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}>
                    <ul className='listHeader'>
                        <li><h3>Number</h3></li>
                        <li><h3>Name</h3></li>
                        <li><h3>Facility</h3></li>
                        <li><h3>Size</h3></li>
                        <li><h3>Price</h3></li>
                        <li><h3>Options</h3></li>
                    </ul>
                    {rentalData.map((item, index) => (
                        <ul className='listBody' key={index}>
                            <li>{item.productNum}</li>
                            <li>{item.productName}</li>
                            <li>{item.facilityName}</li>
                            <li>{item.productSize}</li>
                            <li>{item.productPrice}원</li>
                            <li onClick={() => modalOpen(item)}>더보기</li>
                        </ul>
                    ))}
                </div>
                {modal && (
                    <div className="reservationModalOverlay">
                        <div className="reservationModalContainer">
                            <div>
                                <div className="reservationModalHeader">
                                    <h3>대여 상품 상세 정보</h3>
                                </div>
                                <div className="reservationModalContent">
                                    {selectedProduct ? (
                                        <div>
                                            <div>
                                                <div>
                                                    대여중
                                                </div>
                                                <div>
                                                    <h5>{selectedProduct.productName}</h5>
                                                    <p>{selectedProduct.productNum}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h5>대여자</h5>
                                                <p>{selectedProduct.userName}({selectedProduct.userId})님</p>
                                            </div>
                                            <div>
                                                <h5>시설명</h5>
                                                <p>{selectedProduct.facilityName}</p>
                                            </div>
                                            <div>
                                                <h5>가격</h5>
                                                <p>{new Intl.NumberFormat().format(selectedProduct.productPrice)} 원</p>

                                            </div>
                                            <div>
                                                <h5>상품사이즈</h5>
                                                <p>{selectedProduct.productSize}</p>
                                            </div>
                                            <div>
                                                <h5>대여일</h5>
                                                <p>{selectedProduct.rentalDate}</p>
                                            </div>
                                            <div>
                                                <h5>반납일</h5>
                                                <p>{selectedProduct.returnDate}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>선택된 상품이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                            <div className="reservationModalFooter">
                                {/* <Link to={"/"} className="refundButton">
                                    환불하기
                                </Link> */}
                                <button onClick={modalClose} className="primaryButton">
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserReservation;
