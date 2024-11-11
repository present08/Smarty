import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../css/userCalendar.css';
import { GoPlus } from 'react-icons/go';
import CalendarModal from './CalendarModal'; // CalendarModal import
import { getReservationInfo } from '../../api/userApi';
import moment from 'moment/moment';

const UserCalendar = (props) => {
    const [value, setValue] = useState(new Date());
    const [currentUser, setCurrentUser] = useState(null);
    const [isMainModalOpen, setMainModalOpen] = useState(false);
    const [reservationInfo, setReservationInfo] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openMainModal = () => {
        setMainModalOpen(true);
    };

    const closeMainModal = () => {
        setMainModalOpen(false);
    };

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);
            getReservationInfo(props.user.user_id).then(e => {
                setReservationInfo(e);
                const scheduleData = e.map(reservation => ({
                    id: reservation.user_id + reservation.reservation_start,
                    title: reservation.facility_name,
                    start: reservation.reservation_start,
                    end: reservation.reservation_end,
                }));
                setSchedules(scheduleData);
            });
        }
    }, [props]);

    return (
        <div className='calendar_box'>
            <div className='calendar_header'>
                <h3>출석 및 일정관리</h3>
                <div>
                    <p onClick={openMainModal}>more</p>
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
            <CalendarModal
                isOpen={isMainModalOpen}
                onClose={closeMainModal}
                schedules={schedules}
                selectedEvent={selectedEvent}
                reservationInfo={reservationInfo}
                currentUser={currentUser}
                handleEventClick={handleEventClick}
            />
        </div>
    );
};

export default UserCalendar;
