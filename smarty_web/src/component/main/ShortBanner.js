import React from 'react'
import { Link } from 'react-router-dom';

const ShortBanner = () => {
    return (
        <div style={{ width: '100vw', height: '25vh', backgroundColor: '#f9f9f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
                src="/img/3dicons-calender-dynamic-gradient.png"
                alt=""
                style={{
                    width: '300px',
                    height: '300px',
                    position: 'absolute',
                    top: '-30%',
                    right: '3%',
                    animation: 'moveUpDown 3s ease-in-out infinite',
                    filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))'
                }}
            />
            <img
                src="/img/3dicons-explorer-dynamic-gradient.png"
                alt=""
                style={{
                    width: '350px',
                    height: '350px',
                    position: 'absolute',
                    bottom: '-60%',
                    left: '1%',
                    animation: 'moveUpDown 3s ease-in-out infinite',
                    filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))'
                }}
            />
            <img
                src="/img/3dicons-megaphone-iso-gradient.png"
                alt=""
                style={{
                    width: '200px',
                    height: '200px',
                    position: 'absolute',
                    left: '10%',
                    top: '-50%',
                    animation: 'scaleUpDown 2.5s ease-in-out infinite',
                    filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))'
                }}
            />
            <img src="/img/3dicons-thumb-up-dynamic-gradient.png"
                alt=""
                style={{
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    right: '18%',
                    top: '-20%',
                    animation: 'scaleUpDown 2.5s ease-in-out infinite',
                    filter: 'drop-shadow(1px 1px 30px rgba(128, 128, 128, 0.5))'
                }} />
            <div style={{ width: '80%', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', margin: '0 auto' }}>
                <h2 style={{ fontSize: '35px', color: '#011b2f' }}>운동, 힐링, 문화가 한곳에! SMARTY 센터로 오세요!</h2>
                <Link to={"/user/signUp"} style={{ width: '150px', height: '40px', backgroundColor: '#011b2f', border: 'none', borderRadius: '10px', marginTop: '1.5rem', color: 'aliceblue', display: 'flex', alignItems: "center", justifyContent: 'center' }}>더보기</Link>
            </div>
        </div>
    )
}

export default ShortBanner;