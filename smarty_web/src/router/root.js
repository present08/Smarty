import { lazy, Suspense } from "react";
import { SyncLoader } from "react-spinners";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import newNoticeRouter from "./newNoticeRouter";
const { createBrowserRouter, Outlet } = require("react-router-dom")

const Loading = <div><SyncLoader /></div>
// MainPage 로딩 지연
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const ProductsIndex = lazy(() => import("../pages/products/IndexPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About /></Suspense>
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: "products",
        element: <Suspense fallback={Loading}><ProductsIndex /></Suspense>,
        children: productsRouter()
        // 이 경우랑 아래의 path가 member인 경우랑 어떤 차이가 있는지 생각을 해보자
        // notice를 만들 때 element를 추가 뒀다가 계속 동일한 경로로 이동하는 문제가 있었음
        // 근데 elemnet를 빼주자 마자 잘 해결 됐음
    },
    {
        path: "member",
        children: memberRouter()
    },
    {
        path: "notice",
        children: newNoticeRouter()
    },
])

export default root;