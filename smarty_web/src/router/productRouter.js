import React, { lazy, Suspense } from 'react'

const Loading = <div> Loading... </div>
// const RentalList = lazy(() => import("../component/product/RentalList"))
// const RentalDetail = lazy(() => import("../component/product/RentalDetailPage"))
const ProductList = lazy(() => import("../pages/product/ProductPage"))

const productRouter = () => {

    return [
        {
            path: "",
            element: <Suspense fallback={Loading}> <ProductList/>  </Suspense>
        },
        // {
        //     path: "rental/list",
        //     element: <Suspense fallback={Loading}> <RentalList /> </Suspense>
        // },
        // {
        //     path: "rental-detail/:rental_id",
        //     element: <Suspense fallback={Loading}> <RentalDetail /> </Suspense>
        // },
    ]
}

export default productRouter;