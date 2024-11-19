import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Center_in = lazy(() => import("../pages/centerIntroduction/CenterIntroduction"));
const Directions = lazy(() => import("../pages/centerIntroduction/Directions"));
const FacilityInformation = lazy(() => import("../pages/centerIntroduction/FacilityInformation"));
const ParkingIntro = lazy(() => import("../pages/centerIntroduction/ParkingIntro"));


const centerRouter = () => {
    return [
        {
            path: "center_in",
            element: <Suspense fallback={<Loading />}><Center_in /></Suspense>
        },
        {
            path: "directions",
            element: <Suspense fallback={<Loading />}><Directions /></Suspense>
        },
        {
            path: "facility",
            element: <Suspense fallback={<Loading />}><FacilityInformation /></Suspense>,
        },
        {
            path: "parking",
            element: <Suspense fallback={<Loading />}><ParkingIntro /></Suspense>
        },
    ]
}

export default centerRouter;
