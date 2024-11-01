import { lazy, Suspense } from "react"
import facilityRouter from './facilityRouter';
import productRouter from "./productRouter"
import userRouter from "./userRouter"
const {createBrowserRouter} = require("react-router-dom")

const Loading = <div>Loading...</div>
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"))
const FacilityList = lazy(() => import("../pages/facilities/facilityList/FacilityList"))
const ProductList = lazy(() => import("../pages/products/productList/ProductList"))
const UserList = lazy(() => import("../pages/users/userList/UserList"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Dashboard /></Suspense>
    },
    {
        path: "facilities",
        element: <Suspense fallback={Loading}><FacilityList /></Suspense>,
        children: facilityRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductList /></Suspense>,
        children: productRouter()
    },
    {
        path: "users",
        element: <Suspense fallback={Loading}><UserList /></Suspense>,
        children: userRouter()
    }
])

export default root
