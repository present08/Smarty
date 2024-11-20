import React, { useEffect, useState } from 'react'
import { getClass } from '../../api/classAPI'
import Footer from '../../component/Footer'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import '../../css/classList.css'
import ClassPage from './ClassPage'
import BackToTopButton from '../../component/BackToTopButton'


const ClassList = () => {
    const [classList, setClassList] = useState([])
    const [weekdays, setWeekdays] = useState(["월요일", "화요일", "수요일", '목요일', '금요일', '토요일', '일요일']);
    const [classData, setClassData] = useState(null);
    const [facilityName, setFacilityName] = useState([]);
    const [origin, setOrigin] = useState([]);
    const [prevItem, setPrevItem] = useState('');

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
            <div style={{ backgroundColor: '#f9f9f9' }}>
                <h1 style={{ paddingTop: '3rem' }}>SMARTY 수강신청</h1>
                <div className='ClassBtn' >
                    <div className='classFilter'>
                        <h2>종목을 선택하세요.</h2>
                        <div className='facilityItemList'>
                            {facilityName.map(item => (<div onClick={() => filterList(item)} className='facilityItem' key={item}>{item}</div>))}
                        </div>
                    </div>
                    <div className='class_Content'>
                        {classList.map((item, idx) => (
                            <div className='classtap' key={idx} onClick={() => modalopen(item)}>
                                <h3>{item.facility_name}</h3>
                                <h3>{item.class_name}</h3>
                                <h3>{item.weekday.map((day, i) => (<span key={i}>{day.substring(0, 1)}</span>))}</h3>
                                <h3>{item.start_date.substring(5)} ~ {item.end_date.substring(5)}</h3>
                                <h3>{item.start_time.substring(0, 5)} ~ {item.end_time.substring(0, 5)}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
            {classData ? <ClassPage classData={classData} setModal={() => setClassData()} /> : <></>}
            <Footer />
        </div >
    )
}

export default ClassList