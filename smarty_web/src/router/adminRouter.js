import { Suspense, lazy } from "react";
import adminFacilityRouter from "./adminFacilityRouter";

const Loading = () => <div>Loading....</div>;
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const FacilityList = lazy(() => import("../pages/admin/facilities/facilityList/FacilityList"));
const ProductList = lazy(() => import("../pages/admin/products/productList/ProductList"));
const UserList = lazy(() => import("../pages/admin/users/userList/UserList"));


const adminRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><Dashboard /></Suspense>,
        },
        {
            path: "facilities",
            element: <Suspense fallback={Loading}><FacilityList /></Suspense>,
            children: adminFacilityRouter()
        },
        {
            path: "products",
            element: <Suspense fallback={Loading}><ProductList /></Suspense>,
        },
        {
            path: "users",
            element: <Suspense fallback={Loading}><UserList /></Suspense>,
        },
    ]
}

export default adminRouter;



