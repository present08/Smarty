import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage';

const Loading = <div>Loading.....</div>
const StatsPage = lazy(() => import("../pages/StatsPage"))
const RentalManagementPage = lazy(() => import("../components/product/Management"))
const ProductRegisterPage = lazy(()=> import("../pages/ProductRegisterPage"))

const root = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />, // 메인 페이지에서 내비게이션 관리
        children: [
            {
                path: "",
                element: <Suspense fallback={Loading}><StatsPage /></Suspense>
            },
            {
                path: "rental-management",
                element: <Suspense fallback={Loading}><RentalManagementPage /></Suspense>
            },
            {
                path: "product-register",
                element: <Suspense fallback={Loading}><ProductRegisterPage/></Suspense>
            }
        ]
    }
])

export default root;