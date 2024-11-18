import React, { lazy, Suspense } from 'react';
import BoardDetail from '../components/BoardDetail';

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../components/Announcement"));
const NoticeBoard = lazy(() => import("../components/NoticeBoard"));



const newNoticeRouter = () => {
    return [
        {
            path: "announce",
            element: <Suspense fallback={Loading}><Notice /></Suspense>
        },
        {
            path: "board",
            element: <Suspense fallback={Loading}><NoticeBoard /></Suspense>
        },
        {
            path: "board/:board_id",
            element: <Suspense fallback={Loading}><BoardDetail /></Suspense>
        },
    ];
}

export default newNoticeRouter