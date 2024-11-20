import { Suspense, lazy } from "react";
import { SyncLoader } from 'react-spinners';

const Loading = () => <div><SyncLoader /></div>
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const FacilityList = lazy(() => import("../pages/admin/facilities/facilityList/FacilityList"));
const FacilityAdd = lazy(() => import("../pages/admin/facilities/newFacility/NewFacility"))
const FacilityRead = lazy(() => import("../pages/admin/facilities/facilityRead/FacilityRead"))

const ClassList = lazy(() => import("../pages/admin/classes/classList/ClassList"))
const ClassAdd = lazy(() => import("../pages/admin/classes/newClass/NewClass"))
const ClassRead = lazy(() => import("../pages/admin/classes/classRead/ClassRead"))
const adminRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><Dashboard /></Suspense>,
        },
        {
            path: "facilities",
            element: <Suspense fallback={Loading}><FacilityList /></Suspense>,
        },
        {
            path: "facilities/add",
            element: <Suspense fallback={Loading}><FacilityAdd /></Suspense>,
        },
        {
            path: "facilities/read/:facility_id",
            element: <Suspense fallback={Loading}><FacilityRead /></Suspense>,
        },
        {
            path: "classes/:facility_id",
            element: <Suspense fallback={Loading}><ClassList /></Suspense>,
        },
        {
            path: "classes/:facility_id/add",
            element: <Suspense fallback={Loading}><ClassAdd /></Suspense>,
        },
        {
            path: "classes/:facility_id/read/:class_id",
            element: <Suspense fallback={Loading}><ClassRead /></Suspense>,
        },
    ]
}

export default adminRouter;



