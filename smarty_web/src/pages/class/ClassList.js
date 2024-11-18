import React, { useEffect, useState } from 'react'
import { getClass } from '../../api/classAPI'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import Footer from '../../component/Footer'
import '../../css/classList.css'
import { useNavigate } from 'react-router-dom';

const ClassList = () => {
    const [classList, setClassList] = useState([])
    const [weekdays, setWeekdays] = useState(["월요일", "화요일", "수요일", '목요일', '금요일', '토요일', '일요일']);
    const navigate = useNavigate();

    useEffect(() => {
        getClass().then(e => {
            const classNm = [];
            e.classDTO.map(item => {
                // item객체에 들어있는 facility_id의 갯수 찾기
                const facilityLength = e.classDTO.filter(i => i.facility_id === item.facility_id).length;
                // 재 렌더링 됐을때 중복 추가 방지( if )
                if (classList.length < e.classDTO.length) {
                    // 위에 선언해둔 빈 배열에 facility_id값이 없으면,
                    // id를 추가하고, item 객체에 column : facility_id의 갯수 추가
                    if (!classNm.includes(item.facility_id)) {
                        classNm.push(item.facility_id);
                        item["column"] = facilityLength;
                    }
                    // 난장판인 배열을 순서대로 된 배열대로 재 정렬 이후 item객체에 추가
                    const weekarr = e.weekday[item.class_id].sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
                    item["weekday"] = weekarr;
                    setClassList(prev => [...prev, item]);
                }
                console.log(item)
            });
        })
    }, [])

    const clickMovePage = (i) => {
        navigate(`/classList/${i.class_id}`, { state: i })
    }

    return (
        <div>
            <MainNav />
            <Wrapper />
            <div>
                <div className='ClassBtn' >
                    <h3>SMARTY 이용시간</h3>
                    <div className='classListTable'>
                        <table>
                            <colgroup>
                                <col style={{ width: '10%' }}></col>
                                <col style={{ width: '20%' }}></col>
                                <col style={{ width: '10%' }}></col>
                                <col style={{ width: '10%' }}></col>
                                <col style={{ width: '10%' }}></col>
                                <col style={{ width: '10%' }}></col>
                                {/* <col style={{width:'10%'}}></col> */}
                                <col style={{ width: '10%' }}></col>
                                {/* <col style={{width:'25%'}}></col> */}
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>대상 시설</th>
                                    <th>강 의 명</th>
                                    <th>수강 시작일</th>
                                    <th>수강 종료일</th>
                                    <th>수강 요일</th>
                                    <th>수강 시간</th>
                                    {/* <th>수강 요금</th> */}
                                    <th>수강 정원</th>
                                    {/* <th>신청 하기</th> */}
                                </tr>
                            </thead>
                            <tbody >
                                {classList.map((item, idx) => (
                                    <tr key={idx}>
                                        {item.column ? <td rowSpan={item.column}>{item.facility_name}</td> : <></>}
                                        <td onClick={() => clickMovePage(item)}>{item.class_name}</td>
                                        <td>{item.start_date}</td>
                                        <td>{item.end_date}</td>
                                        <td>{item.weekday.map((i, idx) => `${i.substring(0, 1)}${idx == item.weekday.length - 1 ? "" : ", "}`)}</td>
                                        <td>{item.start_time.substring(0, 5)} ~ {item.end_time.substring(0, 5)}</td>
                                        {/* <td>{item.price} 원</td> */}
                                        <td>{item.class_size} 명</td>
                                        {/* <td>{item.class_name}<br />신청하기</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ClassList