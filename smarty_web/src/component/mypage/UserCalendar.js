import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/userCalendar.css';
import { GoPlus } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { LuCalendarDays } from 'react-icons/lu';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment/moment';

const host = 'http://localhost:8080';

const UserCalendar = (props) => {

    const events = [
        {
            title: '수영장',
            start: '2024-11-05',
            end: '2024-11-09',
            backgroundColor: 'pink',
            textColor: 'white'
        },
        {
            title: '헬스장',
            start: '2024-11-21',
            end: '2024-11-23',
            textColor: 'white'
        },
    ];



    const schedules = [
        { id: 1, title: '수영장', start: '11일 12:00PM', end: '17일 12:00PM' },
        { id: 2, title: '헬스장', start: '12일 3:00PM', end: '18일 3:00PM' },
        { id: 3, title: '요가', start: '13일 6:00PM', end: '19일 6:00PM' },
        { id: 4, title: '필라테스', start: '14일 7:00PM', end: '20일 7:00PM' }
    ];

    const [value, setValue] = useState(new Date());
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState(false);

    const openmodal = () => {
        setModal(true);
    }

    const closemodal = () => {
        setModal(false);
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/api/auth/me`, { withCredentials: true });
            if (response.status === 200) {
                const user = response.data;
                console.log("현재 로그인된 사용자 정보:", user);
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            } else {
                console.log("사용자가 인증되지 않았습니다.");
                return null;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchCurrentUser().then(user => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <div className='calendar_box'>
            <div className='calendar_header'>
                <h3>출석 및 일정관리</h3>
                <div>
                    <p onClick={openmodal}>
                        more
                    </p>
                    <GoPlus style={{ color: 'gray', width: '25px', height: '25px' }} />
                </div>
            </div>
            <div className='calendar_cont'>
                <Calendar
                    calendarType="gregory"
                    onChange={setValue} value={value}
                    formatDay={(locale, date) => moment(date).format("D")}
                    prev2Label={null} next2Label={null}
                />
            </div>
            {modal && (
                <div className='calendarModalContainer'>
                    <div className='calendarModalBox'>
                        <div className='calendarModalCont'>
                            <div className='closeButtonBox'>
                                <AiOutlineClose style={{ width: '30px', height: '30px' }} onClick={closemodal} />
                            </div>
                            <div className='modalbody'>
                                <div className='calendar_Name'>
                                    <div>
                                        <h3>calendar</h3>
                                    </div>
                                    <div>
                                        <FullCalendar
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            initialView="dayGridMonth"
                                            events={events}
                                            editable={false}
                                            selectable={true}
                                            headerToolbar={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='subBox'>
                                    <div>
                                        <div>
                                            <img src="img/user_profile.png" alt="" style={{ width: '120px', height: '120px' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ marginTop: '1rem' }}>{currentUser.user_name}님 (ID : {currentUser.user_id})</h3>
                                            <p style={{ color: 'gray', marginTop: '0.5rem' }}>{currentUser.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h5>next schedule</h5>
                                        {schedules.map((schedule) => (
                                            <div className='scheduleBox' key={schedule.id}>
                                                <div className='scheduleIcon'>
                                                    <LuCalendarDays style={{ width: '30px', height: '30px' }} />
                                                </div>
                                                <div className='scheduletext'>
                                                    <h4 style={{ marginBottom: '0.3rem', color: 'gray' }}>{schedule.title}</h4>
                                                    <p>start : {schedule.start} ~ </p>
                                                    <p>end : {schedule.end}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCalendar;
