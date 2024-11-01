import React from 'react'

const UserReservation = () => {
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
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>예약 및 결제 관리</h3>
            </div>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '300px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}>

            </div>
        </div>
    )
}

export default UserReservation;