import React from 'react'
import { Link } from 'react-router-dom'

const Refund = () => {

    const refund = [
        { number: '1', steppe: 'STEP1', detail: '마이페이지 이동후 스케줄 관리로 이동' },
        { number: '2', steppe: 'STEP2', detail: '예약한 스케줄 선택후 [취소하기] 버튼 클릭' },
        { number: '3', steppe: 'STEP3', detail: '취소 확인 후 [확인] 버튼 클릭' },
    ];

    const provision = [
        { text: '환불·취소는 당일예약 날짜 기준' },
        { text: '환불:신청당일 환불시만 전액환불' },
        { text: '개강 전(매달 30일까지): 총 이용금액의 10%공제 후 환불' },
        { text: '개강 후(매달 1일부터): 총 이용금액의 10%+취소일 (이용일수에 해당되는 금액공제 후 환급)' },
    ];



    return (
        <div className='refundContainer'>
            <div className='submu'>
                <nav>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                    <p >&gt;</p>
                    <Link to="/guide/instructions" style={{ textDecoration: 'none', color: 'black', padding: '10px', }}>이용안내</Link>
                    <p >&gt;</p>
                    <Link to="/guide/hours" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>환불 및 취소 안내</Link>
                </nav>
            </div>
            <div className='refund_box'>
                <div className='refund_cont'>
                    <h3>환불 및 취소</h3>
                    <div className='cont_container'>
                        {refund.map((key) => (
                            <div className='cont_box'>
                                <div className='backbox'>
                                    <h5>{key.steppe}</h5>
                                    <p>{key.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='provision_container'>
                <h5>환불 및 취소 규정</h5>
                <div>
                    {provision.map((key) => (
                        <p>{key.text}</p>
                    ))}

                </div>
            </div>
        </div >
    )
}

export default Refund