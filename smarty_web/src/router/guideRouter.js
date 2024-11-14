import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Center_in = lazy(() => import("../pages/centerIntroduction/CenterIntroduction"));


const centerRouter = () => {
    return [
        {
            path: "center_in",
            element: <Suspense fallback={<Loading />}><Center_in /></Suspense>
        },
    ]
}

export default centerRouter;
