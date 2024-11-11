import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';


const Loading = <div> loading... </div>
const FacilityList = lazy(() => import('./../pages/reservation/Facility_list'));
const ReservationPage = lazy(() => import('./../pages/reservation/ReservationPage'));

const root = createBrowserRouter([
    {
        path: "facilityList",
        element: <Suspense fallback={Loading}><FacilityList /></Suspense>
    },
    {
        path: "facilityList/:facilityId",
        element: <Suspense fallback={Loading}><ReservationPage /></Suspense>
    },
])

export default root;