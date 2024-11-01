import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router-dom"

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
        path: "/facilities",
        element: <Suspense fallback={Loading}><FacilityList /></Suspense>
    },
    {
        path: "/products",
        element: <Suspense fallback={Loading}><ProductList /></Suspense>
    },
    {
        path: "/users",
        element: <Suspense fallback={Loading}><UserList /></Suspense>
    }
])

export default root
