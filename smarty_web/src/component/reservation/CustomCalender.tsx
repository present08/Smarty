import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../../css/reservationCalendar.css';
import { FaRegCalendarCheck } from "react-icons/fa";

const CustomCalender = (props) => {
  const [value, setValue] = useState(new Date());
  const minDate = new Date(); 

  useEffect(() => {
    props.newDate(moment(value).format("YYYY-MM-DD"))
    props.Date1(moment(value).format("YYYY-MM-DD"))
  }, [value])

  return (
    <div className='calendar_container'>
      <h2 className='reservation_minititle'><FaRegCalendarCheck />  체육시설 예약 등록</h2>
      <div>
        <Calendar calendarType="gregory" // 요일을 일요일부터 시작하도록 설정
          onChange={setValue} value={value}
          formatDay={(locale, date) => moment(date).format("D")} // '일' 제외하고 숫자만 보이도록 설정
          prev2Label={null} next2Label={null}
          minDate={minDate}
        />
      </div>
    </div>
  );
};

export default CustomCalender;