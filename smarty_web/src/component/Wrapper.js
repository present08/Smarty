import React from 'react'


const Wrapper = ({ children }) => {
    return (
        <div className='wrapper' style={{ paddingTop: '130px' }}>
            {children}
        </div>
    )
}

export default Wrapper