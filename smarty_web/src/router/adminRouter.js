
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const FacilityIndex = lazy(() => import("../pages/admin/facilities/IndexPage"));
const ProductIndex = lazy(() => import("../pages/admin/products/IndexPage"));
const UserIndex = lazy(() => import("../pages/admin/users/IndexPage"));
const FacilityList = lazy(() => import("../pages/admin/facilities/facilityList/FacilityList"))


const adminRouter = () => {
    return [
        {
            path: "facilities",
            element: <Suspense fallback={Loading}><FacilityIndex /></Suspense>,
            children: [
                {
                    path: "list",
                    elements: <Suspense fallback={Loading}><FacilityList /></Suspense>
                }
            ]
        },
        {
            path: "products",
            element: <Suspense fallback={Loading}><ProductIndex /></Suspense>,
            // children: productRouter()
        },
        {
            path: "users",
            element: <Suspense fallback={Loading}><UserIndex /></Suspense>,
            // children: userRouter()
        },
    ]
}

export default adminRouter;



