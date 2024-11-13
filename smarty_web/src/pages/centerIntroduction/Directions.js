import React from 'react'
import '../../css/directions.css'
import { AiOutlineHome } from "react-icons/ai";
import { IoIosCall } from "react-icons/io";
import { FaBusSimple } from "react-icons/fa6";
import { IoIosSubway } from "react-icons/io";
import { MdOutlineFax } from "react-icons/md";
import MainNav from '../../component/MainNav';
import Footer from '../../component/Footer';
import { Link } from 'react-router-dom';
import BackToTopButton from '../../component/BackToTopButton';
import Wrapper from '../../component/Wrapper';


const Directions = () => {
    return (
        <>
            <MainNav />
            <Wrapper>
                <BackToTopButton />
                <div className='directions-container'>
                    <div className='submu'>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/center/center_in" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>센터소개</Link>
                            <p >&gt;</p>
                            <Link to="/center/directions" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>오시는길</Link>
                        </nav>
                    </div>
                    <div className='directions-header'>
                        <h3>오시는길</h3>
                    </div>
                    <div className='directions-cont'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.6686751117018!2d127.10460207658447!3d37.35035197209553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b59c6fd9f7d31%3A0xbdbad7e886eacc85!2z6re466aw7Lu07ZOo7YSw7JWE7Lm0642w66-47ZWZ7JuQIOyEseuCqOu2hOuLueuvuOq4iOyXreygkA!5e0!3m2!1sko!2skr!4v1729472572666!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: '0' }}
                            allowfullscreen=""
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        <div className='address_call'>
                            <div className='address'>
                                <div>
                                    <AiOutlineHome style={{
                                        width: '40px',
                                        height: '40px',
                                        color: '#ffb915',
                                    }} />
                                </div>
                                <p>경기 성남시 분당구 돌마로 46 (광천빌딩 5층)</p>
                            </div>
                            <div style={{
                                display: 'flex'
                            }}>
                                <div className='fax'>
                                    <div>
                                        <MdOutlineFax style={{
                                            width: '40px',
                                            height: '40px',
                                            color: '#ffb915',
                                        }} />
                                    </div>
                                    <div className='text'>
                                        <p>FAX</p>
                                        <p>031-711-8448</p>
                                    </div>
                                </div>
                                <div className='call'>
                                    <div>
                                        <IoIosCall style={{
                                            width: '40px',
                                            height: '40px',
                                            color: '#ffb915',
                                        }} />
                                    </div>
                                    <div className='text'>
                                        <p>CALL</p>
                                        <p>031-712-7447</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr style={{
                            marginTop: '0.6rem'
                        }} />
                        <div className='traffic'>
                            <div className='traffic-header'>
                                <h3>교통편</h3>
                            </div>
                            <div className='traffic-cont'>
                                <div className='bus'>
                                    <div>
                                        <FaBusSimple style={{
                                            width: '30px',
                                            height: '30px',
                                            color: '#ffb915',
                                        }} />
                                    </div>
                                    <div className='text'>
                                        <p>버스</p>
                                        <p>금호5단지-미금역,2001아울렛</p>
                                    </div>
                                </div>
                                <div className='subway'>
                                    <div>
                                        <IoIosSubway style={{
                                            width: '40px',
                                            height: '40px',
                                            color: '#ffb915',
                                        }} />
                                    </div>
                                    <div className='text'>
                                        <p>지하철</p>
                                        <p>신분당, 수인분당 / 미금역 6번출구, 약 112m</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer />
        </>
    )
}

export default Directions