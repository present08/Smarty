import { Suspense, lazy } from "react";
import { SyncLoader } from 'react-spinners';

const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const FacilityList = lazy(() => import("../pages/admin/facilities/facilityList/FacilityList"));
const FacilityAdd = lazy(() => import("../pages/admin/facilities/newFacility/NewFacility"))
const FacilityRead = lazy(() => import("../pages/admin/facilities/facilityRead/FacilityRead"))
const FacilityModify = lazy(() => import("../pages/admin/facilities/facilityModify/FacilityModify"))
const FacilityStatus = lazy(() => import("../pages/admin/facilities/facilityStatus/FacilityStatus"))

const ClassList = lazy(() => import("../pages/admin/classes/classList/ClassList"))
const ClassAdd = lazy(() => import("../pages/admin/classes/newClass/NewClass"))
const ClassRead = lazy(() => import("../pages/admin/classes/classRead/ClassRead"))

const ProductList = lazy(() => import("../pages/admin/products/productList/ProductList"))
const ProductRead = lazy(() => import("../pages/admin/products/productRead/ProductRead"))

const Permission = lazy(() => import("../component/admin/permission/Permission"))

const Mail = lazy(() => import("../pages/admin/mail/Mail"))

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
            path: "products/:facility_id",
            element: <Suspense fallback={<SyncLoader />}><ProductList /></Suspense>,
        },
        {
            path: "products/:facility_id/read/:product_id",
            element: <Suspense fallback={<SyncLoader />}><ProductRead /></Suspense>,
        },
        {
            path: "status/:facility_id",
            element: <Suspense fallback={<SyncLoader />}><FacilityStatus /></Suspense>,
        },
        {// muam i 77ㅓ
            path: "permission",
            element: <Suspense fallback={<SyncLoader />}><Permission /></Suspense>,
        },
        {// younjun i 77ㅓ
            path: "mail",
            element: <Suspense fallback={<SyncLoader />}><Mail /></Suspense>,
        }
    ]
}

export default adminRouter;



