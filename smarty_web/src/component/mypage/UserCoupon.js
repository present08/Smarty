import React, { useEffect, useState } from 'react';
import '../../css/userCoupon.css';
import { AiOutlineClose } from 'react-icons/ai';
import { RiCoupon3Line } from 'react-icons/ri';
import { getCouponsByUser } from '../../api/couponApi';
import { ImGift } from "react-icons/im";

const UserCoupon = (props) => {
    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('ALL');

    // 모달 열기
    const openModal = () => {
        setModal(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        console.log(props.user)
        if (props.user) {
            setCurrentUser(props.user);
            const fetchCoupons = async () => {
                const userId = props.user.user_id;
                console.log('Fetching coupons for user_id: ', userId);
                try {
                    const couponsData = await getCouponsByUser(userId);
                    console.log('회원쿠폰:', couponsData);
                    setCoupons(couponsData);
                    setFilteredCoupons(couponsData);
                } catch (err) {
                    setError('쿠폰을 불러오는 데 실패했습니다.');
                    console.error('쿠폰 불러오기 실패:', err);
                }
            };
            fetchCoupons();
        } else {
            console.log('유저 정보가 없습니다.');
        }
    }, [props.user]);

    const filterCoupons = (type) => {
        let filtered = [];
        if (type === 'ISSUED') {
            filtered = coupons.filter(coupon => coupon.status === 'ISSUED');
        } else if (type === 'USED') {
            filtered = coupons.filter(coupon => coupon.status === 'USED');
        } else {
            filtered = coupons;
        }
        setFilteredCoupons(filtered);
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        filterCoupons(type);
    };

    return (
        <div className='couponContainer'>
            <button onClick={openModal}>
                <RiCoupon3Line style={{ width: '30px', height: '30px' }} />
            </button>
            {modal && (
                <div className='couponModalContainer'>
                    <div className='couponModalBox'>
                        <div className='couponModalCont'>
                            <div>
                                <div>
                                    <ImGift style={{ width: '30px', height: '30px' }} />
                                    <h3>쿠폰 목록</h3>
                                </div>
                                <AiOutlineClose style={{ width: '40px', height: '40px' }} onClick={closeModal} />
                            </div>
                            <div>
                                <div>
                                    <p onClick={() => handleFilterChange('ISSUED')} style={{ cursor: 'pointer' }}>
                                        사용가능 쿠폰
                                    </p>
                                    <p onClick={() => handleFilterChange('USED')} style={{ cursor: 'pointer' }}>
                                        사용완료 쿠폰
                                    </p>
                                    <p onClick={() => handleFilterChange('ALL')} style={{ cursor: 'pointer' }}>
                                        모든 쿠폰 보기
                                    </p>
                                </div>
                                <div>
                                    {filteredCoupons.map((coupon, index) => {
                                        let status = '';
                                        if (coupon.status === 'ISSUED') {
                                            status = '사용가능';
                                        } else if (coupon.status === 'USED') {
                                            status = '사용완료';
                                        }
                                        return (
                                            <div className='couponbox' key={index}>
                                                <div>
                                                    <h3>{coupon.discount_rate}%</h3>
                                                </div>
                                                <div>
                                                    <h5>{status}</h5>
                                                    <h3>{coupon.coupon_name}</h3>
                                                    <p>사용기간: {coupon.expiry_date}</p>
                                                    <p>코드번호: {coupon.coupon_code}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCoupon;
