import React, { lazy, Suspense } from 'react';
import BoardDetail from '../component/announcement/BoardDetail';

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../component/announcement/Announcement"));
const NoticeBoard = lazy(() => import("../component/announcement/NoticeBoard"));



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