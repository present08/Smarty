import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getReservationInfo, getUserClassApplication } from '../../api/userApi';
import '../../css/userCalendar.css';
import CalendarModal from './CalendarModal';
import ClassCalendarModal from './ClassCalendarModal';
import ClassEventModal from './ClassEventModal';
import EventModal from './EventModal';

const UserCalendar = (props) => {

    // 날짜 관련 상태
    const [value, setValue] = useState(new Date());

    // 사용자 정보 상태
    const [currentUser, setCurrentUser] = useState(null);

    // 모달 관련 상태
    const [isMainModalOpen, setMainModalOpen] = useState(false);
    const [classModalOpen, setClassModalOpen] = useState(false);
    const [isEventModalOpen, setEventModalOpen] = useState(false);
    const [classEventModalOpen, setClassEventModalOpen] = useState(false);

    // 예약 및 수업 정보 관련 상태
    const [reservationInfo, setReservationInfo] = useState([]);
    const [classInfo, setClassInfo] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [classSchedules, setClassSchedules] = useState([]);

    // 선택된 이벤트 상태
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [classselectedEvent, setClassSelectedEvent] = useState(null);

    // 모달 열기
    const openMainModal = () => setMainModalOpen(true);
    const openClassModal = () => setClassModalOpen(true);

    // 모달 닫기
    const closeMainModal = () => {
        setMainModalOpen(false);
        setEventModalOpen(false);
    }
    const closeClassModal = () => {
        setClassModalOpen(false)
        setClassEventModalOpen(false)
    };
    const closeClassEventModal = () => setClassEventModalOpen(false);
    const closeEventModal = () => setEventModalOpen(false);

    // 이벤트 클릭 핸들러
    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setEventModalOpen(true);
    };

    const handleClassEventClick = (info) => {
        const selectedEventId = info.event.id;
        const classItem = classSchedules.find(item => item.id === selectedEventId);
        if (classItem) {
            const generatedEventId = generateEventId(classItem);
            setClassSelectedEvent(generatedEventId);
            setClassEventModalOpen(true);
            console.log("클래스 이벤트 클릭:", classItem);
        } else {
            console.error("클래스 아이템이 유효하지 않습니다:", classItem);
        }
    };

    // 이벤트 ID 생성
    const generateEventId = (classItem) => {
        console.log("generateID", classItem)
        if (!classItem || !classItem.start) {
            console.error("클래스 아이템이 유효하지 않거나 start가 없습니다.", classItem);
            return "InvalidEventId"; // 기본값 반환
        }
        const startData = classItem.start.split("T")
        // const eventId = props.user.user_id + startData[0] + startData[1].split('.')[0]
        const eventId = classItem.id;
        console.log("생성된 이벤트 ID:", eventId);
        return eventId;
    };

    // 사용자 정보 설정 및 예약 정보 가져오기
    useEffect(() => {
        if (props.user) {
            setCurrentUser(props.user);

            // 예약 정보 가져오기
            getReservationInfo(props.user.user_id)
                .then(reservationData => {
                    console.log("받은 예약 데이터:", reservationData); // 디버깅용
                    setReservationInfo(reservationData);
                    const scheduleData = reservationData.map(reservation => ({
                        id: reservation.user_id + reservation.reservation_start,
                        title: reservation.facility_name,
                        start: reservation.reservation_start,
                        end: reservation.reservation_end,
                    }));
                    setSchedules(scheduleData);
                })
                .catch(error => {
                    console.error("Error fetching reservation info:", error);
                });
        }
    }, [props.user]);


    // 수강신청 정보 가져오기
    useEffect(() => {
        if (props.user) {
            getUserClassApplication(props.user.user_id)
                .then(classData => {
                    console.log("받은 수업 데이터:", classData); // 디버깅용
                    setClassInfo(classData);
                    const classSchedules = classData
                        .filter(classItem => classItem.start_date && classItem.end_date) // 유효성 검증
                        .map(classItem => ({
                            id: classItem.enrollment_id,
                            title: classItem.class_name || "Untitled Class",
                            start: classItem.start_date + "T" + classItem.start_time,
                            end: classItem.end_date + "T" + classItem.end_time,
                            allDay: false,
                        }));
                    setClassSchedules(classSchedules);
                })
                .catch(error => {
                    console.error("Error fetching class applications:", error);
                });
        }
    }, [props.user]);


    return (
        <div className='calendar_box'>
            <div className='calendar_header'>
                <h3>출석 및 일정관리</h3>
                <div>
                    <p onClick={openMainModal}>일일입장</p>
                    <p onClick={openClassModal}>수강신청</p>
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
            {selectedEvent && isEventModalOpen && (
                <EventModal
                    reservation={reservationInfo.find(reservation => reservation.user_id + reservation.reservation_start === selectedEvent.id)}
                    currentUser={currentUser}
                    closeModal={closeEventModal}
                />
            )}
            <ClassCalendarModal
                isOpen={classModalOpen}
                onClose={closeClassModal}
                schedules={classSchedules}
                selectedEvent={classselectedEvent}
                classInfo={classInfo}
                currentUser={currentUser}
                handleEventClick={handleClassEventClick}
            />
            {classselectedEvent && classEventModalOpen && (
                <ClassEventModal
                    classEvent={classInfo.find(item => (item.enrollment_id) == classselectedEvent)}
                    currentUser={currentUser}
                    closeModal={closeClassEventModal}
                />
            )}
        </div>
    );
};

export default UserCalendar;
