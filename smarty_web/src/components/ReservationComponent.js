import React, { useEffect, useState } from 'react';
import { LuAlarmClock } from 'react-icons/lu';
import CustomCalender from './CustomCalender.tsx';
import { FaRegCheckSquare } from 'react-icons/fa';
const initTime = {
    start: 6,
    end: 18,
    default: 3
}

const ReservationComponent = ({props}) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState(initTime)
    const [partTime, setPartTime] = useState(0)
    const [timeLine, setTimeLine] = useState([])
    const [fristNum, setFristNum] = useState(0)
    const [lastNum, setLastNum] = useState(0)

    // calendar props date Data
    const newDate = (date) => {
        setDate(date);
    }

    useEffect(() => {
        setTime(props)
        timeSet();
    }, [])
    
    const timeSet = () =>{
        const newTimeLine = [];
        setPartTime((time.end - time.start) / time.default)
        let dt = time.default;
        let cnt = 0;
        let disabled = false
        for (let i = 0; i < time.end - time.start; i++) {
            if (i < dt) {
                const tl = { startTime: time.start + i, endTime: time.start + i + 1, active: false, id: cnt, disabled: disabled }
                newTimeLine.push(tl);
            }
            if (newTimeLine.length == dt) {
                dt += time.default;
                cnt++
            }
            if ((time.end - time.start) % time.default >= (time.end - time.start) - i - 1) {
                disabled = true
            }
        }
        setTimeLine(newTimeLine);
    }


    const handleClick = (tl) => {
        const newTimeLine = timeLine.map((item) => {
            if (tl.id === item.id) {
                return { ...item, active: !item.active }
            }
            return { ...item, active: false }
        })
        setTimeLine(newTimeLine)
    };
    useEffect(() => {
        const frist = timeLine.find(item => item.active)?.startTime || ''
        const last = timeLine.filter(item => item.active).slice(-1)[0]?.endTime || ''
        frist < 10 ? setFristNum('0' + frist) : setFristNum(frist)
        last < 10 ? setLastNum('0' + last) : setLastNum(last)
    }, [handleClick])


    return (
        <div className='reservation_container'>
            <CustomCalender newDate={newDate} />
            <div>
                <h2 className='reservation_minititle'><LuAlarmClock />  예약 시간 선택</h2>
                <div className='time_list'>
                    {timeLine.map((tl, index) => (
                        <button className={`time_btn ${tl.disabled ? 'disabled' : ''} ${tl.active ? 'active' : ""}`} disabled={tl.disabled} key={index} onClick={() => handleClick(tl)}>
                            {tl.startTime < 10 ? '0' + tl.startTime : tl.startTime}:00 - {tl.endTime < 10 ? '0' + tl.endTime : tl.endTime}:00
                        </button>
                    ))}
                </div>
            </div>
            <div className='reservation_final'>
                <h2 className='reservation_minititle'><FaRegCheckSquare />  체육시설 예약 신청 현황</h2>
                <table className='reservation_option'>
                    <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '40%' }} />
                        <col style={{ width: '25%' }} />
                        <col style={{ width: '20%' }} />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">시설명</th>
                            <th scope="col">예약일자</th>
                            <th scope="col">예약시간</th>
                            <th scope="col">이용요금</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td data-content="시설명">시설명</td>
                            <td data-content="예약일자">{date}</td>
                            <td data-content="예약시간">{fristNum + ':00 ~ '}{lastNum + ':00'}</td>
                            <td data-content="이용요금"></td>
                        </tr>
                    </tbody>
                </table>
                <button className='reservation_btn'>예약하기</button>
            </div>
        </div>
    )
}

export default ReservationComponent