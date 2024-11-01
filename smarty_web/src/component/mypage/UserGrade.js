import React from 'react'

const UserGrade = () => {
    return (
        <div style={{
            marginRight: '2rem'
        }}>
            <button
                style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#F0F0F3',
                    color: '#003f66',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '35px',
                    fontSize: '21px',
                    filter: `
                        drop-shadow(-10px -10px 10px rgba(255, 255, 255, 0.7)) 
                        drop-shadow(10px 10px 10px rgba(174, 174, 192, 0.2))
                    `,
                    boxShadow: `
                        inset -10px -10px 10px rgba(255, 255, 255, 0.7), 
                        inset 10px 10px 10px rgba(174, 174, 192, 0.2)
                    `,
                }}>
                Grade
            </button>
        </div>
    )
}

export default UserGrade;