import React from 'react'

const UserRating = () => {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', width: '50%', height: '350px',
        }}>
            <div style={{
                display: 'flex',
                width: '100%',
                height: '30px',
                alignItems: 'center'
            }}>
                <h3 style={{ fontSize: '23px', marginBottom: '1rem', color: '#003f66' }}>활동내역 및 상태</h3>
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

export default UserRating