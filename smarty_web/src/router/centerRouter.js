import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Center_in = lazy(() => import("../component/centerIntroduction/CenterIntroduction"));
const Directions = lazy(() => import("../component/centerIntroduction/Directions"));
const FacilityInformation = lazy(() => import("../component/centerIntroduction/FacilityInformation"));
const ParkingIntro = lazy(() => import("../component/centerIntroduction/ParkingIntro"));


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
