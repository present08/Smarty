import React, { useEffect, useState } from 'react'
import '../../css/facilityComponent.css'
import { AiOutlineHeart } from 'react-icons/ai'

const FacilityComponent = (props) => {
  const { facilityData, reservation } = props;

  const [infoArr, setInfoArr] = useState([])
  const [infoArr1, setInfoArr1] = useState([])
  const [images, setImages] = useState([])

  useEffect(() => {
    switch (facilityData.hot_time) {
      case 0:
        setInfoArr(['시설명', '이용요금(기본)', '기본이용시간(h)', '문의전화'])
        setInfoArr1(['facility_name', 'basic_fee', 'default_time', 'contact'])
        break;
      case 1:
        setInfoArr(['시설명', '이용요금(기본)', '이용요금(할인)', '기본이용시간(h)', '문의전화'])
        setInfoArr1(['facility_name', 'basic_fee', 'basic_fee', 'default_time', 'contact'])
        break;
      case 2:
        setInfoArr(['시설명', '이용요금(기본)', '이용요금(할증)', '기본이용시간(h)', '문의전화'])
        setInfoArr1(['facility_name', 'basic_fee', 'basic_fee', 'default_time', 'contact'])
        break;
      case 3:
        setInfoArr(['시설명', '이용요금(기본)', '이용요금(할인)', '이용요금(할증)', '기본이용시간(h)', '문의전화'])
        setInfoArr1(['facility_name', 'basic_fee', 'basic_fee', 'basic_fee', 'default_time', 'contact'])
        break;
    }
    setImages(facilityData.file_name)
  }, [props])


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
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);



  return (
    <div className='facilityContainer'>
      <div className='facilityThumbnail'>
        <div className="main-image">
          <img src={images ? `http://localhost:8080/api/user/reservation/uploads/${images[currentIndex]}` : ""} alt={`Slide ${currentIndex}`} />
        </div>
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>
      <div className='facilityInfo'>
        <div className='facilityInfoTitle'>
          <h3>SMARTY 시설정보</h3>
        </div>
        <div className='facilityInfoText'>
          {infoArr.map((info, idx) =>
            <div className='facilityInfo_list' key={idx}>
              <div className='facilitySubtitle'>{info}</div>
              <div className='facilityContent'>{info == "이용요금(할인)" ? facilityData[infoArr1[idx]] - facilityData[infoArr1[idx]] * facilityData.rate_adjustment : info == "이용요금(할증)" ? facilityData[infoArr1[idx]] + facilityData[infoArr1[idx]] * facilityData.rate_adjustment : facilityData[infoArr1[idx]]}</div>
            </div>
          )}
          <hr style={{ color: 'gainsboro', width: '80%', marginTop: '1rem' }} />
          <div className='facility_hottime'>
            <p>이용요금(할인) : 오전 첫 시간 적용</p>
            <p>이용요금(할증) : 오후 마지막 시간 적용</p>
          </div>
          <div className='facilityInfoButton'>
            <button><AiOutlineHeart style={{ width: '30px', height: '30px', color: 'gray' }} /></button>
            <button onClick={reservation}>예약하기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FacilityComponent