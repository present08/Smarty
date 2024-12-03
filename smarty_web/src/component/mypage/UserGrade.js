import React, { useEffect, useState } from 'react';
import '../../css/userGrade.css';
import { AiOutlineClose, AiOutlineRuby } from 'react-icons/ai';
import axios from 'axios';
import { getPaymentDetailsByUserId } from '../../api/membershipApi';

const UserGrade = (props) => {

    const [total, setTotal] = useState(0); // 금액 초기화

    const membershipBenefits = [
        { benefits: '입장권 5% 할인' },
        { benefits: '입장권 7% 할인' },
        { benefits: '입장권 10% 할인' },
        { benefits: '입장권 15% 할인' }
    ];

    const membershipCriteria = [
        { criteria: '총 결제금액 - 300,000원 달성시' },
        { criteria: '총 결제금액 - 500,000원 달성시' },
        { criteria: '총 결제금액 - 1,000,000원 달성시' },
        { criteria: '총 결제금액 - 1,500,000원 달성시' },
    ];

    const images = [
        '/img/silver.jpg',
        '/img/gold.jpg',
        '/img/platinum.jpg',
        '/img/diamond.jpg'
    ];

    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        console.log(props.user);
        setCurrentUser(props.user);

        if (props.user) {
            getPaymentDetailsByUserId(props.user.user_id)
                .then((data) => {
                    console.log(data);

                    const totalAmount = data.reduce((total, item) => {
                        return total + (item.amount || 0);
                    }, 0);

                    console.log('Total Amount:', totalAmount);
                    setTotal(totalAmount);
                })
                .catch((error) => {
                    console.error("Failed to fetch payment details:", error);
                    setTotal(0);
                });
        }
    }, [props.user]);

    // useEffect(() => {
    //     console.log('Updated total:', total);
    // }, [total]);

    let grade = '';
    let nextGrade = '';
    let remainingAmount = '';
    let imageSrc = '';
    let benefits = '';
    let criteria = '';

    if (total <= 200) {
        grade = '실버';
        nextGrade = '골드';
        remainingAmount = 300 - total;
        imageSrc = images[0];
        benefits = membershipBenefits[0];
        criteria = membershipCriteria[0];
    } else if (total <= 500) {
        grade = '골드';
        nextGrade = '플레티넘';
        remainingAmount = 8000 - total;
        imageSrc = images[1];
        benefits = membershipBenefits[1];
        criteria = membershipCriteria[1];
    } else if (total <= 8000) {
        grade = '플레티넘';
        nextGrade = '다이아';
        remainingAmount = 9000 - total;
        imageSrc = images[2];
        benefits = membershipBenefits[2];
        criteria = membershipCriteria[2];
    } else {
        grade = '다이아';
        nextGrade = '최고 등급입니다.';
        imageSrc = images[3];
        benefits = membershipBenefits[3];
        criteria = membershipCriteria[3];
    }


    return (
        <div className='gradeContainer'>
            <button onClick={openModal}><AiOutlineRuby style={{ width: '30px', height: '30px' }} /></button>
            {modal && (
                <div className='gradeModalContainer'>
                    <div className='gradeModalBox'>
                        <div className='gradeModalCont'>
                            <div>
                                <AiOutlineClose style={{ width: '40px', height: '40px' }} onClick={closeModal} />
                            </div>
                            <div className='gradeModalUserBox'>
                                <div className='imggradebox'>
                                    <div>
                                        <div>
                                            <h3 style={{ marginBottom: '0.5rem' }}>{currentUser ? `${currentUser.user_name}님` : '로딩 중...'}의</h3>
                                            <h3>현재 등급과 혜택 !</h3>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div style={{ marginRight: '1rem' }}>
                                                <img src={imageSrc} alt={`${grade} 이미지`} style={{ width: '100px', height: '100px' }} />
                                            </div>
                                            <div>
                                                <h3 style={{ marginBottom: '0.5rem' }}>현재 등급은 '{grade}' 입니다. </h3>
                                                <div className='boon'>
                                                    <div style={{ width: '60px', height: '25px', backgroundColor: 'pink', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '0.5rem' }}>
                                                        혜택
                                                    </div>
                                                    <p>{benefits.benefits}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>{remainingAmount}원 추가 결제시 '{nextGrade}' 달성 </h4>
                                        </div>
                                    </div>
                                </div>
                                <div className='gradeTabBox'>
                                    <div className='membershipheader'>
                                        <h3>멤버십 혜택 안내</h3>
                                        <p>등급별 상세 혜택을 확인하세요.</p>
                                    </div>
                                    <div className='membershipbody' >
                                        <div>
                                            <div>
                                                <h5>{grade}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <h5>혜택</h5>
                                                <p>{benefits.benefits}</p>
                                            </div>
                                            <div>
                                                <h5>기준</h5>
                                                <p>{criteria.criteria}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserGrade;
