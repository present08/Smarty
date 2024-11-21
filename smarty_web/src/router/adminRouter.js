import { Suspense, lazy } from "react";
import { SyncLoader } from 'react-spinners';

const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const FacilityList = lazy(() => import("../pages/admin/facilities/facilityList/FacilityList"));
const FacilityAdd = lazy(() => import("../pages/admin/facilities/newFacility/NewFacility"))
const FacilityRead = lazy(() => import("../pages/admin/facilities/facilityRead/FacilityRead"))
const FacilityModify = lazy(() => import("../pages/admin/facilities/facilityModify/FacilityModify"))

const ClassList = lazy(() => import("../pages/admin/classes/classList/ClassList"))
const ClassAdd = lazy(() => import("../pages/admin/classes/newClass/NewClass"))
const ClassRead = lazy(() => import("../pages/admin/classes/classRead/ClassRead"))
const ClassModify = lazy(() => import("../pages/admin/classes/classModify/ClassModify"))
const adminRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={<SyncLoader />}><Dashboard /></Suspense>,
        },
        {
            path: "facilities",
            element: <Suspense fallback={<SyncLoader />}><FacilityList /></Suspense>,
        },
        {
            path: "facilities/add",
            element: <Suspense fallback={<SyncLoader />}><FacilityAdd /></Suspense>,
        },
        {
            path: "facilities/read/:facility_id",
            element: <Suspense fallback={<SyncLoader />}><FacilityRead /></Suspense>,
        },
        {
            path: "facilities/modify/:facility_id",
            element: <Suspense fallback={<SyncLoader />}><FacilityModify /></Suspense>,
        },
        {
            path: "classes/:facility_id",
            element: <Suspense fallback={<SyncLoader />}><ClassList /></Suspense>,
        },
        {
            path: "classes/:facility_id/add",
            element: <Suspense fallback={<SyncLoader />}><ClassAdd /></Suspense>,
        },
        {
            path: "classes/:facility_id/read/:class_id",
            element: <Suspense fallback={<SyncLoader />}><ClassRead /></Suspense>,
        },
        {
            path: "classes/:facility_id/modify/:class_id",
            element: <Suspense fallback={<SyncLoader />}><ClassModify /></Suspense>,
        },
    ]
}

export default adminRouter;



