import React from 'react'
import { Link } from 'react-router-dom'

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
                <h1 style={{ color: 'white' }}>SMARTY</h1>
            </div>
            <div style={{
                width: '40%',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto'
            }}>
                <ul style={{
                    display: 'flex',
                    margin: 0,
                    padding: 0
                }}>
                    <li>
                        <Link to={"/"} style={{
                            color: '#9e9e9e', marginRight: '1rem'
                        }}>이용안내</Link>
                    </li>
                    <li>
                        <Link to={"/center/center_in"} style={{
                            color: '#9e9e9e', marginRight: '1rem'
                        }}>센터소개</Link>
                    </li>
                    <li>
                        <Link to={"/"} style={{
                            color: '#9e9e9e', marginRight: '1rem'
                        }}>수강신청</Link>
                    </li>
                    <li>
                        <Link to={"/"} style={{
                            color: '#9e9e9e', marginRight: '1rem'
                        }}>일일입장</Link>
                    </li>
                    <li>
                        <Link to={"/"} style={{
                            color: '#9e9e9e', marginRight: '1rem'
                        }}>물품대여</Link>
                    </li>
                    <li>
                        <Link to={"/"} style={{
                            color: '#9e9e9e'
                        }}>커뮤니티</Link>
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
                        color: '#9e9e9e'
                    }}>&copy; 2024 TF33. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default Footer