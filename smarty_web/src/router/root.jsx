import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';


const Loading = <div> loading... </div>
const Facility_list = lazy(() => import('./../pages/Facility_list'));
const ReservationPage = lazy(() => import('./../pages/ReservationPage'));

const root = createBrowserRouter([
    {
        path:"",
        element:<Suspense fallback={Loading}><Facility_list/></Suspense>
    },
    {
        path:"/:facilityId",
        element:<Suspense fallback={Loading}><ReservationPage/></Suspense>
    },
])

export default root;