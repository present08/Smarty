import React from 'react'
import MainNav from '../../component/MainNav'
import Footer from '../../component/Footer'
import '../../css/centerIntro.css'
import { Link } from 'react-router-dom'
import BackToTopButton from '../../component/BackToTopButton'
import Wrapper from '../../component/Wrapper'

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
                            <Link to="/center_intro" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>센터소개</Link>
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
                                SMARTY센터는 다양한 연령층과 관심사를 가진 분들이 함께 어울릴 수 있는 커뮤니티 중심의 공간입니다.<br />
                                최신 헬스장, 실내 수영장, 골프 연습장, 요가 및 필라테스 스튜디오, 다목적 강의실 등 최첨단 시설을 갖추고 있습니다.<br />
                                또한, 체육 및 문화 프로그램은 물론, 특별한 이벤트와 전시, 워크숍 등을 통해 회원님들의 삶의 질을 향상시킬 수 있는 다양한 기회를 제공합니다.<br />
                                SMARTY센터는 건강과 여가를 중시하는 공간으로, 모든 회원님들에게 맞춤형 서비스를 제공하며, 즐거움과 활력을 불어넣는 소중한 장소입니다.
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