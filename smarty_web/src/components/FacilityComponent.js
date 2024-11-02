import React from 'react'
import './FacilityComponent.css'

const FacilityComponent = ({props}) => {
  props.app = 'internet'
  const infoArr = ['시설명', '이용요금(주중)','이용요금(할증)','기본이용시간(h)' ,'예약방법', '문의전화']
  const infoArr1 = ['facility_name','basic_fee','extra_fee','default_time','app','contact']

  return (
    <div className='container'>
      <div className='thumbnail'>
        <img src="/img/축구장.jpg" />
      </div>
      <div className='info'>
        <h3>시설정보</h3>
        {infoArr.map((info, idx) =>
          <div className='info_list' key={idx}>
            <div className='title'>{info}</div>
            <div className='line'></div>
            <div className='content'>{props[infoArr1[idx]]}</div>
          </div>
        )}
      </div>
     
    </div>
  )
}

export default FacilityComponent