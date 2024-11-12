import React, { useState } from 'react';
import '../../css/firstInfor.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Swimming from '../../component/centerIntroduction/Swimming';
import { GymA } from '../../component/centerIntroduction/GymA';
import SportsA from '../../component/centerIntroduction/SportsA';
import SportsB from '../../component/centerIntroduction/SportsB';
import MainNav from '../../component/MainNav';
import Footer from '../../component/Footer';
import BackToTopButton from '../../component/BackToTopButton';
import Wrapper from '../../component/Wrapper';

const First_infor = () => {

    const images = [
        '/img/lobby1.jpeg',
        '/img/archery.jpeg',
        '/img/badminton.jpeg',
        '/img/indoor_gym.jpeg'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedComponent, setSelectedComponent] = useState(null);

    // 슬라이드 버튼
    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // 슬라이드
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleToggleComponent = (componentName) => {
        if (selectedComponent === componentName) {
            setSelectedComponent(null);
        } else {
            setSelectedComponent(componentName);
        }
    };


    return (
        <>
            <MainNav />
            <Wrapper>
                <BackToTopButton />
                <div className="infor_container" >
                    <div className="intro-back">
                        <div className="intro">
                            <div className="slider-container">
                                <div className="main-image">
                                    <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                                </div>
                                <div className="thumbnails">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`thumbnail ${index}`}
                                            onClick={() => goToSlide(index)}
                                            className={index === currentIndex ? 'active' : ''}
                                        />
                                    ))}
                                </div>
                                <button className="prev" onClick={prevSlide}>&#10094;</button>
                                <button className="next" onClick={nextSlide}>&#10095;</button>
                            </div>
                            <div className="intro-text">
                                <div className="text-box">
                                    <h3>1F 시설안내</h3>
                                </div>
                                {/* 시설 안내 영역 */}
                                <div className="facility-map"
                                    style={{
                                        backgroundImage: `url('img/1stFloor-removebg-preview.png')`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        width: '100%',
                                        height: '100%'
                                    }}>
                                    {/* 수영장 컴포넌트 */}
                                    <Swimming selectedComponent={selectedComponent} handleToggleComponent={handleToggleComponent} />
                                    {/* 헬스장 A 컴포넌트 */}
                                    <GymA selectedComponent={selectedComponent} handleToggleComponent={handleToggleComponent} />
                                    {/* 체육관 A 컴포넌트 */}
                                    <SportsA selectedComponent={selectedComponent} handleToggleComponent={handleToggleComponent} />
                                    {/* 체육관 컴포넌트 */}
                                    <SportsB selectedComponent={selectedComponent} handleToggleComponent={handleToggleComponent} />
                                    {/* 확대 해제 버튼 */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='particular-container'>
                        <h2>상세정보</h2>
                        <div className='tb-box'>
                            <table className='particular-tb'>
                                <tbody>
                                    <tr>
                                        <th style={{ borderRight: '1px solid #717171' }}>
                                            위치
                                        </th>
                                        <td>
                                            1층
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ borderRight: '1px solid #717171' }}>
                                            주요용도
                                        </th>
                                        <td>
                                            전문 전시회, 체육시설, 수영장, 헬스장
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ borderRight: '1px solid #717171' }}>
                                            규모
                                        </th>
                                        <td>
                                            10,368m² (약 3,136평)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </Wrapper>
            <Footer />
        </>
    );
};

export default First_infor;