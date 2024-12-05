import React, { lazy, Suspense } from 'react';
import BoardDetail from '../component/announcement/BoardDetail';

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../component/announcement/Announcement"));
const NoticeBoard = lazy(() => import("../component/announcement/NoticeBoard"));
const JobList = lazy(() => import("../pages/announcement/JobListPage"));
const NoticeModifyPage = lazy(() => import("../component/announcement/NoticeModifyPage"));
const Community = lazy(() => import("../component/announcement/Community"));
const AnnounceModifyPage = lazy(() => import("../component/announcement/AnnounceModifyPage"))



const newNoticeRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><Community /></Suspense>
        },
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
        {
            path: "jobList",
            element: <Suspense fallback={Loading}><JobList /></Suspense>
        },
        {
            path: "board/modify/:board_id",
            element: <Suspense fallback={Loading}><NoticeModifyPage /></Suspense>
        },
        {
            path: "announce/modify/:announce_id",
            element: <Suspense fallback={Loading}><AnnounceModifyPage /></Suspense>
        },
    ];
}

export default newNoticeRouter;