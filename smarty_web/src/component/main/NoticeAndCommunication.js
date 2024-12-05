import React from 'react'
import { Link } from 'react-router-dom';

const NoticeAndCommunication = () => {
    return (
        <div style={{ width: '100vw', height: '70vh', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '5rem' }}>
            <div style={{
                width: '90%', height: '75%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column'
            }}>
                <div style={{ width: '93%', height: '10%', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{
                        fontSize: '32px', marginBottom: '10px', textAlign: 'right'
                    }}>SMARTY 센터 소식 & 커뮤니티</h2>
                    <p style={{ fontSize: '19px', color: 'gray', textAlign: 'right' }}>중요한 공지도 보고 자유롭게 소통해 보세요</p>
                </div>
                <div style={{ width: '100%', height: '70%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <div style={{ width: '45%', height: '90%', backgroundColor: '#3a0057', borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', flexDirection: 'column' }}>
                        <img src="/img/3dicons-megaphone-iso-gradient.png" alt="" style={{ width: '300px', height: '300px', position: 'absolute', left: '-8%', top: '-20%', animation: 'moveUpDown 3s ease-in-out infinite', filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))' }} />
                        <img src="/img/3dicons-zoom-front-color.png" alt="" style={{ width: '250px', height: '250px', position: 'absolute', right: '-6%', top: '20%', animation: 'scaleUpDown 2.5s ease-in-out infinite', filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))' }} />
                        <h4 style={{ fontSize: '38px', color: 'white' }}>Announcement</h4>
                        <Link to={"/notice/announce"} style={{
                            width: '160px', height: '50px', backgroundColor: 'white', border: 'none', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', fontWeight: 'bold', color: 'black', marginTop: '20px'
                        }}>바로가기</Link>
                    </div>
                    <div style={{ width: '45%', height: '90%', backgroundColor: '#f9d402', borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', flexDirection: 'column' }}>
                        <img src="/img/3dicons-notify-heart-front-color.png" alt="" style={{ width: '200px', height: '200px', position: 'absolute', left: '0%', top: '-15%', animation: 'scaleUpDown 2.5s ease-in-out infinite', filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))' }} />
                        <img src="/img/3dicons-thumb-up-front-color.png" alt="" style={{ width: '200px', height: '200px', position: 'absolute', right: '-6%', top: '35%', animation: 'moveUpDown 3s ease-in-out infinite', filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))' }} />
                        <h4 style={{ fontSize: '38px', color: 'white' }}>Free bulletin board</h4>
                        <Link to={"/notice/board"} style={{
                            width: '160px', height: '50px', backgroundColor: 'white', border: 'none', borderRadius: '10px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px', fontWeight: 'bold', color: 'black', marginTop: '20px'
                        }}>바로가기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeAndCommunication;