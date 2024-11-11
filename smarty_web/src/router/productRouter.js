// import React, { lazy, Suspense } from 'react'

// const Loading = <div> Loading... </div>
// const ProductDetail = lazy(() => import("../component/pages/product/DetailPage"))
// const RentalSummary = lazy(() => import("../component/pages/rental/RentalSummaryPage"))
// const RentalIndex = lazy(() => import("../component/pages/rental/IndexPage"))
// const RentalList = lazy(() => import("../component/pages/rental/RentalList"))
// const RentalDetail = lazy(() => import("../component/pages/rental/RentalDetailPage"))

// const productRouter = () => {

//   return [
//     {
//       path: "detail/:product_id",
//       element: <Suspense fallback={Loading}> <ProductDetail /> </Suspense>
//     },
//     {
//       path: "summary",
//       element: <Suspense fallback={Loading}> <RentalSummary /> </Suspense>
//     },
//     {
//       path: "index",
//       element: <Suspense fallback={Loading}> <RentalIndex /> </Suspense>
//     },
//     {
//       path: "list",
//       element: <Suspense fallback={Loading}> <RentalList /> </Suspense>
//     },
//     {
//       path: "detail/:rental_id",
//       element: <Suspense fallback={Loading}> <RentalDetail /> </Suspense>
//     },
//   ]
// }

// export default productRouter;

