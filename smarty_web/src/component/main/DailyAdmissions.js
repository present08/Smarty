import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getfacilityId } from '../../api/reservaionApi';
import '../../css/reservationPage.css'
import '../../css/dailyAdmissions.css';

const DailyAdmissions = () => {
    const navigate = useNavigate();
    const [facility_id, setFacility_id] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getfacilityId().then(e => {
            setFacility_id(e);
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % facility_id.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [facility_id]);

    const handleClick = (i) => {
        navigate(`/facilityList/${i.facility_id}`, { state: i });
    };

    return (
        <div id='oneDiv' className='dailyAdmissions_container'>
            <div className='dailyAdmissions_box'>
                <div>
                    <h2>일일입장</h2>
                    <p>하루 동안 자유롭게 이용할 수 있는<br />
                        일일 단위 예약 서비스입니다.</p>
                    <button>
                        <Link to={"/facilityList"}>일일입장 더보기</Link>
                    </button>
                </div>
                <div>
                    <div className='dailyslider' style={{ transform: `translateX(${-currentIndex * (100 / 3)}%)` }}>
                        {facility_id.map((i, idx) => (
                            <div className='facilityBtn' key={idx} onClick={() => handleClick(i)}>
                                <img src={`http://localhost:8080/api/user/reservation/uploads/${i.file_name[0]}`} alt={i.facility_name} />
                                <div className='facility_info'>
                                    <h3>{i.facility_name}</h3>
                                    <p>{i.court_name} ({i.default_time}시간)</p>
                                    <div>
                                        <div>
                                            <p style={{ fontSize: '21px', color: '#5700f8' }}>{i.basic_fee}</p>
                                            <p style={{ color: 'gray', textIndent: '0px', fontSize: '20px' }}>원</p>
                                        </div>
                                        <p style={{ fontSize: '17px', color: 'gray', marginLeft: '120px' }}>오픈시간: {i.open_time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyAdmissions;


// dailyslider