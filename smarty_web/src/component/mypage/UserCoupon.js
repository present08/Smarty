import React, { useEffect, useState } from 'react';
import '../../css/userCoupon.css';
import { AiOutlineClose } from 'react-icons/ai';
import { RiCoupon3Line } from 'react-icons/ri';
import { getCouponsByUser } from '../../api/couponApi';

const UserCoupon = (props) => {

    const [modal, setModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 모달 열기
    const openModal = () => {
        setModal(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);
            const fetchCoupons = async () => {
                const userId = props.user.user_id;
                console.log('Fetching coupons for user_id: ', userId);

                setLoading(true);
                try {
                    const couponsData = await getCouponsByUser(userId);
                    console.log('회원쿠폰:', couponsData);
                    setCoupons(couponsData);
                } catch (err) {
                    setError('쿠폰을 불러오는 데 실패했습니다.');
                    console.error('쿠폰 불러오기 실패:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchCoupons();
        } else {
            console.log('유저 정보가 없습니다.');
        }
    }, [props.user]);

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
                                <AiOutlineClose style={{ width: '40px', height: '40px' }} onClick={closeModal} />
                            </div>
                            <div>
                                <div>
                                    <h3>쿠폰 목록</h3>
                                    <ul>
                                        {coupons.map((coupon) => (
                                            <li key={coupon.coupon_id}>
                                                <p>{coupon.coupon_name}</p>
                                                <p>유효기간: {coupon.expiry_date}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    ) : (
                                    <p>사용할 수 있는 쿠폰이 없습니다.</p>
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
