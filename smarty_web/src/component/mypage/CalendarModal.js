import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';
import moment from 'moment/moment';
import { LuCalendarDays } from 'react-icons/lu';

const CalendarModal = ({ isOpen, onClose, schedules, selectedEvent, reservationInfo, currentUser, handleEventClick }) => {
    if (!isOpen) return null;

    return (
        <div className='calendarModalContainer'>
            <div className='calendarModalBox'>
                <div className='calendarModalCont'>
                    <div className='closeButtonBox'>
                        <AiOutlineClose style={{ width: '30px', height: '30px' }} onClick={onClose} />
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
                                    eventClick={handleEventClick}
                                    eventContent={(arg) => {
                                        const isSelected = arg.event.id === selectedEvent?.id;
                                        return (
                                            <div style={{ color: isSelected ? '#ffcc00' : '', padding: '5px', borderRadius: '5px' }}>
                                                {arg.event.title}
                                            </div>
                                        );
                                    }}
                                />
                                {/* 상세 모달 */}
                                {selectedEvent && (
                                    <div onClick={onClose}
                                        style={{
                                            width: '23%', height: '70%', backgroundColor: 'white', position: 'absolute', zIndex: '999', right: '9%', borderRadius: '20px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                        {reservationInfo.map(reservation => {
                                            const eventId = reservation.user_id + reservation.reservation_start;
                                            if (eventId === selectedEvent.id) {
                                                return (
                                                    <div style={{ width: '80%', height: '80%' }} key={eventId}>
                                                        {/* 예약 상세 내용 */}
                                                        <div style={{ width: '100%', height: '25%', display: 'flex', flexDirection: 'column' }}>
                                                            <div style={{ textAlign: 'left' }}>
                                                                <p style={{ fontSize: '33px', marginRight: '10px', margin: 0 }}>SMARTY</p>
                                                                <p style={{ fontSize: '33px', marginRight: '10px', margin: 0, display: 'flex', marginBottom: '0.5rem' }}>
                                                                    시설 예약
                                                                    <AiFillCheckCircle style={{ width: '25px', height: '25px', marginLeft: '5px' }} />
                                                                </p>
                                                                <p style={{ fontSize: '19px', color: 'grey' }}>{moment().format('YYYY-MM-DD HH:mm')}</p>
                                                            </div>
                                                        </div>
                                                        <hr style={{ border: '1px solid gray', marginBottom: '2rem' }} />
                                                        <div style={{ width: '100%', height: '10%', textAlign: 'left' }}>
                                                            <p style={{ fontSize: '23px' }}>{currentUser?.user_name}님</p>
                                                        </div>
                                                        <hr style={{ border: '1px solid gray', marginBottom: '2rem' }} />
                                                        {/* 예약 정보 */}
                                                        <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                                                            <p style={{ fontSize: '21px', color: 'gray' }}>예약 시설명</p>
                                                            <p style={{ fontSize: '21px' }}>{reservation.facility_name}</p>
                                                        </div>
                                                        <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                                                            <p style={{ fontSize: '21px', color: 'gray' }}>예약 시작</p>
                                                            <p style={{ fontSize: '21px' }}>{moment(reservation.reservation_start).format('YYYY-MM-DD HH:mm')}</p>
                                                        </div>
                                                        <div style={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-between' }}>
                                                            <p style={{ fontSize: '21px', color: 'gray' }}>예약 종료</p>
                                                            <p style={{ fontSize: '21px' }}>{moment(reservation.reservation_end).format('YYYY-MM-DD HH:mm')}</p>
                                                        </div>
                                                        <hr style={{ border: '1px solid gray', marginTop: '1rem' }} />
                                                        <div style={{ width: '100%', height: '10%', textAlign: 'right', marginTop: '2rem' }}>
                                                            <button style={{ width: '120px', height: '50px', backgroundColor: '#003f66', border: 'none', borderRadius: '15px', color: 'white' }}>예약취소</button>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* 회원 정보 및 다음 일정 추가 */}
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
    );
};

export default CalendarModal;
