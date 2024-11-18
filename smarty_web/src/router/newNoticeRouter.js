import React, { lazy, Suspense } from 'react';
import BoardDetail from '../component/component/announcement/BoardDetail';

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../component/component/announcement/Announcement"));
const NoticeBoard = lazy(() => import("../component/component/announcement/Board"));



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