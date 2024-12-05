import React, { useEffect, useState } from 'react';
import '../../css/userGrade.css';
import { AiOutlineClose, AiOutlineRuby } from 'react-icons/ai';
import { getPaymentDetailsByUserId } from '../../api/membershipApi';

const UserGrade = (props) => {

    const [total, setTotal] = useState(0);
    const [membershipLevel, setMembershipLevel] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState(false);

    const membershipBenefits = [
        { benefits: '아직 받을 수 있는 할인이 없습니다.' },
        { benefits: '입장권 3% 할인' },
        { benefits: '입장권 5% 할인' },
        { benefits: '입장권 7% 할인' },
        { benefits: '입장권 10% 할인' }
    ];

    const membershipCriteria = [
        { criteria: '아직 결제 금액이 없습니다 ㅠㅠ.' },
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

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);
            getPaymentDetailsByUserId(props.user.user_id)
                .then((data) => {
                    console.log("Payment details:", data);
                    setTotal(data);
                })
                .catch((error) => {
                    console.error("Failed to fetch payment details:", error);
                    setTotal(0);
                });
        }
    }, [props.user]);


    let grade = '';     //등급
    let nextGrade = '';            //다음등급
    let remainingAmount = '';           //다음 등급 도달 금액
    let imageSrc = '';              // 로고이미지
    let benefits = '';              // 할인혜택
    let criteria = '';              // 달성까지 남은 금액


    // 멤버십 레벨에 따라 등급 및 혜택 설정
    if (total >= 1000) {
        grade = '다이아';
        nextGrade = '최고 등급입니다.';
        remainingAmount = 0;
        imageSrc = images[3];
        benefits = membershipBenefits[3];
        criteria = membershipCriteria[3];
    } else if (total >= 700) {
        grade = '플래티넘';
        nextGrade = '다이아';
        remainingAmount = 1000 - total;
        imageSrc = images[2];
        benefits = membershipBenefits[2];
        criteria = membershipCriteria[2];
    } else if (total >= 500) {
        grade = '골드';
        nextGrade = '플래티넘';
        remainingAmount = 700 - total;
        imageSrc = images[1];
        benefits = membershipBenefits[1];
        criteria = membershipCriteria[1];
    } else if (total >= 200) {
        grade = '실버';
        nextGrade = '골드';
        remainingAmount = 500 - total;
        imageSrc = images[0];
        benefits = membershipBenefits[0];
        criteria = membershipCriteria[0];
    } else {
        grade = '브론즈';
        nextGrade = '실버';
        remainingAmount = 200 - total;
        imageSrc = images[0];
        benefits = membershipBenefits[0];
        criteria = membershipCriteria[0];
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
