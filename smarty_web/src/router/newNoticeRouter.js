import React, { lazy, Suspense } from 'react';

const Loading = <div>Loading...</div>;
const Notice = lazy(() => import("../pages/products/Announcement"));
const NoticeBoard = lazy(() => import("../pages/products/NoticeBoard"));



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
    ];
}

export default newNoticeRouter