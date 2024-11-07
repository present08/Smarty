import React, { useEffect, useState } from 'react'
import './FacilityComponent.css'

const FacilityComponent = ({ props }) => {
  const [infoArr, setInfoArr] = useState([])
  const [infoArr1, setInfoArr1] = useState([])
  useEffect(() => {
    switch (props.hot_time) {
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
  }, [props])



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
            <div className='content'>{info == "이용요금(할인)" ? props[infoArr1[idx]] - props[infoArr1[idx]] * props.rate_adjustment : info == "이용요금(할증)" ? props[infoArr1[idx]] + props[infoArr1[idx]] * props.rate_adjustment : props[infoArr1[idx]]}</div>
          </div>
        )}
        <p> ※ 이용요금(할인) : 오전 첫 시간 적용</p>
        <p> ※ 이용요금(할증) : 오후 마지막 시간 적용</p>
      </div>

    </div>
  )
}

export default FacilityComponent