import React from 'react'
import MainNav from '../MainNav'
import Footer from '../Footer'
import '../../css/centerIntro.css'
import { Link } from 'react-router-dom'
import BackToTopButton from '../BackToTopButton'
import Wrapper from '../Wrapper'

const CenterIntroduction = () => {
    return (
        <>
            <MainNav />
            <Wrapper>
                <BackToTopButton />
                <div className='centro_container'>
                    <div className='submu'>
                        <nav>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                            <p >&gt;</p>
                            <Link to="/center" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>센터소개</Link>
                        </nav>
                    </div>
                    <div className='centro_cont'>
                        <h4>SMARTY</h4>
                        <p>최첨단 시설과 함께 다양한 프로그램을 제공하는 다목적 공간</p>
                        <div className='imgBox'>
                            <img src="/smarty.jpeg" alt="smarty이미지" />
                        </div>
                        <div className='centro_text'>
                            <p>
                                저희 복합문화체육시설 SMARTY센터는 다양한 문화와 스포츠 활동을 한 공간에서 즐길 수 있도록 설계된 다목적 공간입니다. <br />
                                최첨단 시설과 함께 다양한 프로그램을 통해 회원님들의 건강과 여가를 위한 최상의 서비스를 제공합니다.
                            </p>
                        </div>
                    </div>
                </div >
            </Wrapper>
            <Footer />
        </>
    )
}

export default CenterIntroduction



// SMARTY