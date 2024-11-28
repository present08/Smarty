import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AiOutlineClose } from 'react-icons/ai';
import { LuCalendarDays } from 'react-icons/lu';
import moment from 'moment';

const ClassCalendarModal = ({ isOpen, onClose, schedules, selectedEvent, classInfo, currentUser, handleEventClick }) => {

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
                            <h5>next schedule</h5>
                            <div>
                                {schedules.map((schedule, idx) => (
                                    <div className='scheduleBox' key={idx}>
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
        </div >
    );
}

export default ClassCalendarModal