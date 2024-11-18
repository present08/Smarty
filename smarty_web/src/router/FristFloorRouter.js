import { lazy, Suspense } from 'react';

const Loading = () => <div>Loading....</div>;
const ReservationPage = lazy(() => import("../component/pages/ReservationPage"));

const FirstFloorRouter = () => {
    return [
        {
            path: ":facilityId",
            element: <Suspense fallback={<Loading />}><ReservationPage /></Suspense>
        },
    ];
}

export default FirstFloorRouter;
