import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import userrouter from "./userrouter";
import centerRouter from "./centerRouter";
import productRouter from "./productRouter";

const Loading = <div><SyncLoader /></div>;
const Main = lazy(() => import("../component/Main"));
const FirstInfor = lazy(() => import("../component/centerIntroduction/guide/FirstInfor"));
const MyPage = lazy(() => import("../component/mypage/MyPage"));
const FacilityList = lazy(() => import('../component/pages/Facility_list'));
const ReservationPage = lazy(() => import("../component/pages/ReservationPage"));
const ProductList = lazy(() => import("../component/pages/product/ListPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "user",
        children: userrouter()
    },
    {
        path: "center",
        children: centerRouter()
    },
    {
        path: "1f",
        element: <Suspense fallback={Loading}><FirstInfor /></Suspense>,
    },
    {
        path: "mypage",
        element: <Suspense fallback={Loading}><MyPage /></Suspense>
    },
    {
        path: "facilityList",
        element: <Suspense fallback={Loading}><FacilityList /></Suspense>
    },
    {
        path: "facilityList/:facilityId",
        element: <Suspense fallback={Loading}><ReservationPage /></Suspense>
    },
    {
        path: "product",
        element: <Suspense fallback={Loading}> <ProductList /> </Suspense>,
        children: productRouter()
    },
]);

export default root;
