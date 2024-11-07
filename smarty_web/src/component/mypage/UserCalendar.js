import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/userCalendar.css';
import { GoPlus } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';
import { LuCalendarDays } from 'react-icons/lu';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment/moment';

const host = 'http://localhost:8080/api/auth';

const UserCalendar = () => {

    const [value, setValue] = useState(new Date());
    const [currentUser, setCurrentUser] = useState(null);
    const [modal, setModal] = useState(false);
    const [reservationInfo, setReservationInfo] = useState([]);
    const [schedules, setSchedules] = useState([]); // schedules 상태 추가

    const openmodal = () => {
        setModal(true);
    };

    const closemodal = () => {
        setModal(false);
    };

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${host}/me`, { withCredentials: true });
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

    const getReservationInfo = async (user_id) => {
        try {
            const response = await axios.get(`${host}/reservationUser`, { params: { user_id } });
            console.log(response.data);
            return response.data; // 예약 정보를 반환
        } catch (error) {
            console.error("Error fetching reservation info:", error);
        }
    };

    useEffect(() => {
        const loadUserData = async () => {
            const user = await fetchCurrentUser();
            if (user) {
                setCurrentUser(user);
                const reservations = await getReservationInfo(user.user_id);
                setReservationInfo(reservations);

                const scheduleData = reservations.map(reservation => ({
                    id: reservation.user_id + reservation.reservation_start,
                    title: reservation.facility_name,
                    start: reservation.reservation_start,
                    end: reservation.reservation_end,
                }));
                setSchedules(scheduleData);
            }
        };

        loadUserData();
    }, []);

    return (
        <div className='calendar_box'>
            <div className='calendar_header'>
                <h3>출석 및 일정관리</h3>
                <div>
                    <p onClick={openmodal}>more</p>
                    <GoPlus style={{ color: 'gray', width: '25px', height: '25px' }} />
                </div>
            </div>
            <div className='calendar_cont'>
                <Calendar
                    calendarType="gregory"
                    onChange={setValue}
                    value={value}
                    formatDay={(locale, date) => moment(date).format("D")}
                    prev2Label={null}
                    next2Label={null}
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
                                            events={schedules}
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
                                            <h3 style={{ marginTop: '1rem' }}>{currentUser?.user_name}님 (ID : {currentUser?.user_id})</h3>
                                            <p style={{ color: 'gray', marginTop: '0.5rem' }}>{currentUser?.email}</p>
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
                                                    <p>start : {moment(schedule.start).format('YYYY-MM-DD HH:mm')} ~ </p>
                                                    <p>end : {moment(schedule.end).format('YYYY-MM-DD HH:mm')}</p>
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
