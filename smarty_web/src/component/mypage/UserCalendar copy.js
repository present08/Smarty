



import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '../../css/userCalendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // 드래그 앤 드롭 기능을 위한 플러그인

const host = 'http://localhost:8080';

const UserCalendar = () => {
    const events = [
        { title: 'Event 1', date: '2024-11-05' },
        { title: 'Event 2', date: '2024-11-06' },
    ];

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                editable={false}
                selectable={true}
            />
        </div>
    );
};

export default UserCalendar;

