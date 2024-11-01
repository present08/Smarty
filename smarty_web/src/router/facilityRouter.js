import { lazy, Suspense } from "react"

const facilityRouter = () => {

    const Loading = <div>Loading...</div>
    const FacilityAdd = lazy(() => import("../pages/facilities/newFacility/NewFacility"))
    const FacilityRead = lazy(() => import("../pages/facilities/facilityRead/FacilityRead"))
    const FacilityModify = lazy(() => import("../pages/facilities/facilityModify/FacilityModify"))

  return [
    {
        path: "add",
        element: <Suspense fallback={Loading}><FacilityAdd /></Suspense>
    },
    {
        path: "read/:facilityId",
        element: <Suspense fallback={Loading}><FacilityRead /></Suspense>
    },
    {
        path: "modify/:facilityId",
        element: <Suspense fallback={Loading}><FacilityModify /></Suspense>
    }
  ]
}

export default facilityRouter