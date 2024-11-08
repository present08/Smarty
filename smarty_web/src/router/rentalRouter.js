import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const Loading = <div> Loading... </div>
const RentalSummary = lazy(() => import("../pages/rental/RentalSummaryPage"))
const RentalIndex = lazy(() => import("../pages/rental/IndexPage"))
const RentalList = lazy(() => import("../pages/rental/RentalList"))
const RentalDetail = lazy(() => import("../pages/rental/RentalDetailPage"))

const rentalRouter = () => {
  return [
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
      path: "detail/:rental_id",
      element: <Suspense fallback={Loading}> <RentalDetail/> </Suspense>
    },
  ]
}

export default rentalRouter