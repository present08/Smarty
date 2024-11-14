import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import userrouter from "./userrouter";
import centerRouter from "./centerRouter";
import adminRouter from "./adminRouter";
import productRouter from "./productRouter";

const Loading = <div><SyncLoader /></div>;
const Main = lazy(() => import("../component/Main"));
const FirstInfor = lazy(() => import("../pages/centerIntroduction/FirstInfor"));
const MyPage = lazy(() => import("../pages/mypage/MyPage"));
const FacilityList = lazy(() => import('../pages/reservation/Facility_list'));
const ReservationPage = lazy(() => import("../pages/reservation/ReservationPage"));
const ChatBot = lazy(() => import("../component/chatbot/Chatbot"));
const Admin = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const ProductPage = lazy(() => import("../pages/product/ProductPage"))
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))
const RentalPage = lazy(() => import("../pages/product/RentalPage"))

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
        path: "admin",
        element: <Suspense fallback={Loading}><Admin /></Suspense>,
        children: adminRouter()
    },
    {
        path: "chatbot",
        element: <Suspense fallback={Loading}><ChatBot /></Suspense>,
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
        element: <Suspense fallback={Loading}> <ProductPage /> </Suspense>,
        children: productRouter()
    },
    {
        path: "product/detail/:product_id",
        element: <Suspense fallback={Loading}> <ProductDetail /> </Suspense>
    },
    {
        path: "rental",
        element: <Suspense fallback={Loading}> <RentalPage /> </Suspense>
    }
]);

export default root;
