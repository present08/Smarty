import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import adminRouter from "./adminRouter";
import centerRouter from "./centerRouter";
import guideRouter from "./guideRouter";
import newNoticeRouter from "./newNoticeRouter";
import productRouter from "./productRouter";
import userRouter from "./userRouter";
import PaymentPage from "../pages/payment/PaymentPage";


const Loading = <div><SyncLoader /></div>;
const Main = lazy(() => import("../pages/main/Main"));
const FirstInfor = lazy(() => import("../pages/centerIntroduction/FirstInfor"));
const MyPage = lazy(() => import("../pages/mypage/MyPage"));
const FacilityList = lazy(() => import('../pages/reservation/Facility_list'));
const ReservationPage = lazy(() => import("../pages/reservation/ReservationPage"));
const ClassList = lazy(() => import("../pages/class/ClassList"));
// const ClassPage = lazy(() => import("../pages/class/ClassPage"));
const ChatBot = lazy(() => import("../component/chatbot/Chatbot"));
const Admin = lazy(() => import("../pages/admin/IndexPage"));
// 관리자 페이지 라우팅 설정
// 진입시 통합 레이아웃 인덱스 화면에 <Outlet />으로 하위 컴포넌트 렌더링
const ProductList = lazy(() => import("../pages/product/ProductPage"));
const ProductDetail = lazy(() => import("../pages/product/DetailPage"));
const RentalPage = lazy(() => import("../pages/product/RentalPage"));
const RentalListPage = lazy(() => import("../pages/product/RentalListPage"));
const UserEnrollmentPage = lazy(() => import("../pages/class/UserEnrollmentPage"));
const CartPage = lazy(() => import("../pages/cart/CartPage"))
const PaymentSuccessPage = lazy(() => ("../pages/payment/PaymentPage"))


const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "user",
        children: userRouter()
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
        path: "guide",
        children: guideRouter()
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
        path: "classList",
        element: <Suspense fallback={Loading}><ClassList /></Suspense>
    },
    // {
    //     path: "classList/:classId",
    //     element: <Suspense fallback={Loading}><ClassPage /></Suspense>
    // },
    {
        path: "product",
        element: <Suspense fallback={Loading}> <ProductList /> </Suspense>,
        children: productRouter()
    },
    {
        path: "product/detail/:product_id",
        element: <Suspense fallback={Loading}> <ProductDetail /> </Suspense>
    },
    {
        path: "rental",
        element: <Suspense fallback={Loading}> <RentalPage /> </Suspense>
    },
    {
        path: "rentals",
        element: <Suspense fallback={Loading}> <RentalListPage /> </Suspense>
    },
    {
        path: "cart",
        element: <Suspense fallback={Loading}> <CartPage /> </Suspense>
    },
    {
        path: "payment/success",
        element: <Suspense fallback={Loading}> <PaymentPage /> </Suspense>
    },
    {
        path: "notice",
        children: newNoticeRouter()
    },
    {
        path: "enrollment/:class_id",
        element: <Suspense fallback={Loading}> <UserEnrollmentPage /> </Suspense>
    },
]);

export default root;