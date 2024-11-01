import React from 'react'
import './FacilityComponent.css'

const FacilityComponent = () => {
  const infoArr = ['시설명', '장소', '신청구분', '이용요금', '예약방법', '문의전화']
  const infoArr1 = ['시설이름', '경기도 성남시 미금', '개인', '이만원', '인터넷', '031-123-4567']
  return (
    <div className='container'>
      <div className='thumbnail'>
        <img src="/img/축구장.jpg" />
      </div>
      <div className='info'>
        <h3>시설정보</h3>
        {infoArr.map((info, idx) =>
          <div className='info_list'>
            <div className='title'>{info}</div>
            <div className='line'></div>
            <div className='content'>{infoArr1[idx]}</div>
          </div>
        )}
      </div>
     
    </div>
  )
}

export default FacilityComponent