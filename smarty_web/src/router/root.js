import { lazy, Suspense } from "react"
import facilityRouter from './facilityRouter';
import productRouter from "./productRouter"
import userRouter from "./userRouter"
const {createBrowserRouter} = require("react-router-dom")

const Loading = <div>Loading...</div>
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const FacilityIndex = lazy(() => import("../pages/facilities/IndexPage"))
const ProductIndex = lazy(() => import("../pages/products/IndexPage"))
const UserIndex = lazy(() => import("../pages/users/IndexPage"))
const TestPage = lazy(() => import("../pages/facilities/newCourt/NewCourt"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Dashboard /></Suspense>,
        errorElement: <div>잘못된 접근입니다.</div>
    },
    {
        path: "facilities",
        element: <Suspense fallback={Loading}><FacilityIndex /></Suspense>,
        children: facilityRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductIndex /></Suspense>,
        children: productRouter()
    },
    {
        path: "users",
        element: <Suspense fallback={Loading}><UserIndex /></Suspense>,
        children: userRouter()
    },
    {
        path: "test",
        element: <Suspense fallback={Loading}><TestPage /></Suspense>,
    }
])

export default root
