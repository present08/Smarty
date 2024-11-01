import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import userrouter from "./userrouter";
import centerRouter from "./centerRouter";

const Loading = <div><SyncLoader /></div>;
const Main = lazy(() => import("../component/Main"));
const FirstInfor = lazy(() => import("../component/centerIntroduction/guide/FirstInfor"))
const MyPage = lazy(() => import("../component/mypage/MyPage"))


const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "user",
        children: userrouter()
    },
    {
        path: "center",
        children: centerRouter()
    },
    {
        path: "1f",
        element: <Suspense fallback={Loading}><FirstInfor /></Suspense>
    },
    {
        path: "mypage",
        element: <Suspense fallback={Loading}><MyPage /></Suspense>
    },
]);

export default root;
