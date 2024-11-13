import React from 'react'
import '../css/footer.css'

const Footer = () => {
    return (
        <div style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#011b2f'
        }}>

            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h1 style={{ color: 'aliceblue' }}>SMARTY</h1>
            </div>
            <div className='gitLink'>
                <ul>
                    <li>
                        <a href="https://www.notion.so/1124e1c610d98050b92dd9291f67466c?pvs=4" target="_blank" rel="noopener noreferrer" >Se-hyun</a>
                    </li>
                    <li>
                        <a href="https://github.com/present08" target="_blank" rel="noopener noreferrer">Mu-am</a>
                    </li>
                    <li>
                        <a href="https://github.com/HJ9948" target="_blank" rel="noopener noreferrer">Hyun-jae</a>
                    </li>
                    <li>
                        <a href="https://github.com/2KJoong" target="_blank" rel="noopener noreferrer">Kyung-joong</a>
                    </li>
                    <li>
                        <a href="https://www.notion.so/128043c6bc9180c0aa80c5e6974dcc1e?pvs=4" target="_blank" rel="noopener noreferrer">Young-jun</a>
                    </li>
                    <li>
                        <a href="https://github.com/kimhyesoo99" target="_blank" rel="noopener noreferrer">Hye-soo</a>
                    </li>
                </ul>
            </div>
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <p
                    style={{
                        color: 'aliceblue'
                    }}>&copy; 2024 TF33. All Rights Reserved.</p>
            </div>
        </div >
    )
}

export default Footer