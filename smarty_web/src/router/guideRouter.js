
import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Instructions = lazy(() => import("../pages/guide/Instructions"))
const OperatinghoursPage = lazy(() => import("../pages/guide/OperatinghoursPage"));
const RefundPage = lazy(() => import("../pages/guide/RefundPage"))



const centerRouter = () => {
    return [
        {
            path: "instructions",
            element: <Suspense fallback={Loading}><Instructions /></Suspense>,
        },
        {
            path: "hours",
            element: <Suspense fallback={<Loading />}><OperatinghoursPage /></Suspense>
        },
        {
            path: "refund",
            element: <Suspense fallback={<Loading />}><RefundPage /></Suspense>
        },
    ]
}

export default centerRouter;
