import React, { useEffect, useState } from 'react';
import '../../css/mainClassList.css';
import { useNavigate } from 'react-router-dom'
import { getClass } from '../../api/classAPI';
import { AiFillSchedule, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';

const MainClassList = () => {

    const navigate = useNavigate();
    const [classList, setClassList] = useState([]);
    const [facilityName, setFacilityName] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const weekdays = ["월요일", "화요일", "수요일", '목요일', '금요일', '토요일', '일요일'];

    useEffect(() => {
        const facility = [];
        getClass().then(e => {
            e.classDTO.map(item => {
                const weekarr = e.weekday[item.class_id].sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
                item["weekday"] = weekarr;
                setClassList(prev => [...prev, item]);
                if (!facility.includes(item.facility_name)) {
                    facility.push(item.facility_name);
                }
            });
            setFacilityName(facility);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % classList.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [classList]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % classList.length);
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + classList.length) % classList.length);
    };

    const handleClassClick = (i) => {
        navigate(`/classList`, { state: i });
    };


    return (
        <div className='mainClass_container'>
            <div className='mainClass_box'>
                <div className='mainClass_header'>
                    <p>건강과 즐거움을 더하는 특별한 프로그램에 지금 참여하세요!</p>
                    <h2>SMARTY 클래스 신청</h2>
                </div>
                <div className='mainClass_body'>
                    <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentIndex * 400}px)` }}>
                        {classList.map((item, idx) => (
                            <div className='mainClass_div' key={idx} onClick={() => handleClassClick(item)} >
                                <div>
                                    <div>
                                        <AiFillSchedule style={{ width: '35px', height: '35px' }} />
                                    </div>
                                    <div>
                                        <h3>{item.class_name}</h3>
                                        <h4>{item.facility_name}</h4>
                                    </div>
                                    <div>
                                        <AiOutlineClockCircle style={{ marginRight: '5px' }} />
                                        <p>{item.weekday.map((day, i) => (<span key={i}>{day.substring(0, 1)} </span>))} {item.start_time.substring(0, 5)} ~ {item.end_time.substring(0, 5)}</p>
                                    </div>
                                    <div>
                                        <AiOutlineCalendar style={{ marginRight: '5px' }} />
                                        <p>{item.start_date.substring(5)} ~ {item.end_date.substring(5)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="navigation-buttons">
                    <AiOutlineArrowLeft style={{ width: '20px', height: '20px', marginRight: '10px' }} onClick={handlePrev} disabled={currentIndex === 0} />
                    <AiOutlineArrowRight style={{ width: '20px', height: '20px' }} onClick={handleNext} disabled={currentIndex === classList.length - 1} />
                </div>
            </div>
        </div >
    );
};

export default MainClassList;
