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
                        
                    </div>
                </div >
            </Wrapper>
            <Footer />
        </>
    )
}

export default CenterIntroduction



// SMARTY