import React, { lazy, Suspense } from 'react'

const Loading = <div> Loading... </div>
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))
const RentalSummary = lazy(() => import("../component/product/RentalSummary"))
const RentalIndex = lazy(() => import("../component/product/IndexPage"))
const RentalList = lazy(() => import("../component/product/RentalList"))
const RentalDetail = lazy(() => import("../component/product/RentalDetailPage"))
const ProductList = lazy(() => import("../pages/product/ProductPage"))

const productRouter = () => {

    return [
        {
            path: "",
            element: <Suspense fallback={Loading}> <ProductList/>  </Suspense>
        },
        // {
        //     path: "detail/:product_id",
        //     element: <Suspense fallback={Loading}> <ProductDetail /> </Suspense>
        // },
        {
            path: "summary",
            element: <Suspense fallback={Loading}> <RentalSummary /> </Suspense>
        },
        {
            path: "index",
            element: <Suspense fallback={Loading}> <RentalIndex /> </Suspense>
        },
        {
            path: "list",
            element: <Suspense fallback={Loading}> <RentalList /> </Suspense>
        },
        {
            path: "rental-detail/:rental_id",
            element: <Suspense fallback={Loading}> <RentalDetail /> </Suspense>
        },
    ]
}

export default productRouter;
