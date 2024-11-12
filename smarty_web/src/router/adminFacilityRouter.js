import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;
const FacilityIndex = lazy(() => import("../pages/admin/facilities/IndexPage"))
const NewFacility = lazy(() => import("../pages/admin/facilities/newFacility/NewFacility"))

const adminFacilityRouter = () => {
    return [
        {
            path: "",
            element: <Suspense fallback={Loading}><FacilityIndex /></Suspense>,
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><NewFacility /></Suspense>,
        }
    ]
}

export default adminFacilityRouter;