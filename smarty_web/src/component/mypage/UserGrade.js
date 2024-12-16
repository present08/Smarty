import React, { useEffect, useState } from 'react';
import '../../css/userGrade.css';
import { AiOutlineClose, AiOutlineRuby } from 'react-icons/ai';
import { getPaymentDetailsByUserId, getUserMemberGrade } from '../../api/membershipApi';

const UserGrade = (props) => {
    console.log("UserGrade", props)

    const [total, setTotal] = useState(0);
    const [membershipLevel, setMembershipLevel] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState(false);
    const [gradeInfo, setGradeInfo] = useState({ grade: '', nextGrade: '', remainingAmount: 0, imageSrc: '', benefits: '', criteria: '' });

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

            getUserMemberGrade(props.user.user_id)
                .then((data) => {
                    console.log("User membership grade data:", data);
                    if (data && data.length > 0) {
                        const level = data[0].membership_level;
                        console.log("Membership level being set:", level);
                        setMembershipLevel(level);
                    } else {
                        console.error("No membership data found.");
                        setMembershipLevel('');
                    }
                })
                .catch((error) => {
                    console.error("Error fetching user grade:", error);
                    setMembershipLevel('');
                });
        }
    }, [props.user]);

    useEffect(() => {
        let grade = ''; let nextGrade = ''; let remainingAmount = 0; let imageSrc = ''; let benefits = ''; let criteria = '';

        if (membershipLevel === '다이아') {
            grade = '다이아';
            nextGrade = '최고 등급입니다.';
            imageSrc = images[3];
            benefits = membershipBenefits[4].benefits;
            criteria = membershipCriteria[4].criteria;
        } else if (membershipLevel === '플래티넘') {
            grade = '플래티넘';
            nextGrade = '다이아';
            remainingAmount = 1000 - total;
            imageSrc = images[2];
            benefits = membershipBenefits[3].benefits;
            criteria = membershipCriteria[3].criteria;
        } else if (membershipLevel === '골드') {
            grade = '골드';
            nextGrade = '플래티넘';
            remainingAmount = 800 - total;
            imageSrc = images[1];
            benefits = membershipBenefits[2].benefits;
            criteria = membershipCriteria[2].criteria;
        } else if (membershipLevel === '실버') {
            grade = '실버';
            nextGrade = '골드';
            remainingAmount = 600 - total;
            imageSrc = images[0];
            benefits = membershipBenefits[1].benefits;
            criteria = membershipCriteria[1].criteria;
        } else {
            grade = '브론즈';
            nextGrade = '실버';
            remainingAmount = 300 - total;
            imageSrc = images[0];
            benefits = membershipBenefits[0].benefits;
            criteria = membershipCriteria[0].criteria;
        }

        setGradeInfo({
            grade, nextGrade, remainingAmount, imageSrc, benefits, criteria
        });

    }, [membershipLevel, total]);

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
                                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                        <h3 style={{ marginBottom: '0.5rem' }}>{currentUser ? `${currentUser.user_name}님` : '로딩 중...'}의</h3>
                                        <h3>현재 등급과 혜택 !</h3>
                                    </div>
                                    <div>
                                        <div>
                                            <div style={{ marginRight: '1rem' }}>
                                                <img src={gradeInfo.imageSrc} alt={`${gradeInfo.grade} 이미지`} style={{ width: '100px', height: '100px' }} />
                                            </div>
                                            <div>
                                                <h3 style={{ marginBottom: '0.5rem' }}>현재 등급은 '{gradeInfo.grade}' 입니다. </h3>
                                                <div className='boon'>
                                                    <div style={{ width: '60px', height: '25px', backgroundColor: 'pink', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '0.5rem' }}>
                                                        혜택
                                                    </div>
                                                    <p>{gradeInfo.benefits}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>{gradeInfo.remainingAmount}원 추가 결제시 '{gradeInfo.nextGrade}' 달성 </h4>
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
                                                <h5>{gradeInfo.grade}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <h5>혜택</h5>
                                                <p>{gradeInfo.benefits}</p>
                                            </div>
                                            <div>
                                                <h5>기준</h5>
                                                <p>{gradeInfo.criteria}</p>
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
