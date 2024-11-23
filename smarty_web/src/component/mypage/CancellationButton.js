import React from 'react'
import { FaUser } from 'react-icons/fa';

const CancellationButton = () => {
    return (
        <div style={{ width: '90%', height: '85px', backgroundColor: '#3283a8', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', margin: '0 auto', marginBottom: '20px', borderRadius: '20px' }}>
            <div style={{ width: '100%', height: '100%', }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '20%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50px', border: 'none', backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
                            <FaUser style={{ color: 'white ', width: '30px', height: '30px', }} />
                        </div>
                    </div>
                    <div style={{ width: '70%', height: '60%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <div></div>
                        <h3 style={{ marginTop: '0.3rem', color: 'white' }}>예약 취소</h3>
                        <p style={{ fontSize: '12px', marginTop: '0.5rem', color: 'white' }}>예약 취소는 신중하게 생각해 주세요</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancellationButton;