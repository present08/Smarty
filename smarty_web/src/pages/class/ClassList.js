import React, { useEffect, useState } from 'react'
import { AiOutlineBook, AiOutlineCalendar, AiOutlineCheck, AiOutlineClockCircle } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { getClass } from '../../api/classAPI'
import BackToTopButton from '../../component/BackToTopButton'
import Footer from '../../component/Footer'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import '../../css/classList.css'
import ClassPage from './ClassPage'


const ClassList = () => {

    const [classList, setClassList] = useState([])
    const [weekdays, setWeekdays] = useState(["월요일", "화요일", "수요일", '목요일', '금요일', '토요일', '일요일']);
    const [classData, setClassData] = useState(null);
    const [facilityName, setFacilityName] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [prevItem, setPrevItem] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setClassData(location.state)
        }
    }, [location])


    useEffect(() => {
        const facility = [];
        getClass().then(e => {
            e.classDTO.map(item => {
                if (classList.length < e.classDTO.length) {
                    const weekarr = e.weekday[item.class_id].sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
                    item["weekday"] = weekarr;
                    console.log(item)
                    setClassList(prev => [...prev, item]);
                    setOrigin(prev => [...prev, item]);
                    if (!facility.includes(item.facility_name)) {
                        facility.push(item.facility_name);
                    }
                }
            })
            setFacilityName(facility)
        })
    }, [])

    const modalopen = (classData) => {
        setClassData(classData);
    }

    const filterList = (item) => {
        switch (prevItem) {
            case '':
                setClassList(origin.filter(value => value.facility_name == item));
                setPrevItem(item);
                break;
            case item:
                setPrevItem('');
                setClassList(origin);
                break;
            default:
                setClassList(origin.filter(value => value.facility_name == item));
                setPrevItem(item);
                break;
        }
    }

    return (
        <div>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div style={{ backgroundColor: '#f9f9f9', paddingTop: '2rem' }}>
                <div className='ClassBtn' >
                    <div className='classFilter'>
                        <div style={{ width: '100%', height: '100px', borderTopLeftRadius: '30px', display: 'flex', alignItems: 'center', backgroundColor: '#e9e9e9', borderTopRightRadius: '30px' }}>
                            <h2><AiOutlineCheck style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '20px' }} />종목을 선택하세요.</h2>
                        </div>
                        <div className='facilityItemList'>
                            {facilityName.map(item => (<div onClick={() => filterList(item)} className='facilityItem' style={{ backgroundColor: prevItem == item ? "#f4d160" : "#8ac4d0" }} key={item}>{item}</div>))}
                        </div>
                    </div>
                    <div className='class_Content'>
                        <div style={{ width: '100%', height: '100px', borderTopLeftRadius: '30px', display: 'flex', alignItems: 'center', backgroundColor: '#e9e9e9', borderTopRightRadius: '30px' }}>
                            <h2> <AiOutlineBook style={{ width: '30px', height: '30px', marginRight: '10px', marginLeft: '20px' }} /> SMARTY 클래스 개설 목록</h2>
                        </div>
                        {classList.map((item, idx) => (
                            <div className='classtap' key={idx} onClick={() => modalopen(item)}>
                                <div>
                                    <div>
                                        <h4>{item.facility_name}</h4>
                                        <p>{item.class_id}</p>
                                    </div>
                                    <div>
                                        <h3>{item.class_name}</h3>
                                    </div>
                                    <div>
                                        <AiOutlineClockCircle style={{ marginRight: '5px' }} />
                                        <p style={{ marginRight: '5px' }}>{item.weekday.map((day, i) => (<span key={i}>{day.substring(0, 1)} </span>))}</p>
                                        <p>{item.start_time.substring(0, 5)} ~ {item.end_time.substring(0, 5)}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <AiOutlineCalendar style={{ marginRight: '5px' }} />
                                        <p>{item.start_date.substring(5)} ~ {item.end_date.substring(5)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            {classData ? <ClassPage classData={classData} setModal={() => setClassData()} /> : <></>}
            <Footer />
        </div >
    );
};

export default ClassList;
