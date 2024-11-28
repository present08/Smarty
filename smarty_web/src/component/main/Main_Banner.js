import React, { useEffect, useState } from 'react'
import '../../css/banner.css'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

const Main_Banner = () => {

    const images = [
        '/img/bannerImg1.png',
        '/img/bannerImg2.png',
        '/img/bannerImg3.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

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

    // 자동 슬라이드 설정
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 6000);
        return () => clearInterval(slideInterval);
    }, [currentIndex]);


    return (
        <div className='banner_container'>
            <div className='banner_cont'>
                <div className='text_iconBox'>
                    <div className='textBox'>
                        <h1 style={{ marginBottom: '1rem' }}>복합문화체육시설 SMARTY</h1>
                        <h1>통합 예약시스템</h1>
                        <p>모든 예약을 한번에 간편하게!</p>
                    </div>
                    <div className='iconBox'>
                        <button>
                            <AiFillCaretLeft style={{ width: '50px', height: '50px' }} onClick={prevSlide} />
                        </button>
                        <button>
                            <AiFillCaretRight style={{ width: '50px', height: '50px' }} onClick={nextSlide} />
                        </button>
                    </div>
                </div>
                <div className='imgBox'>
                    <img className='banner-img' src={images[currentIndex]} alt={`Slide ${currentIndex}`} style={{
                        width: '500px', height: '500px',
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Main_Banner;