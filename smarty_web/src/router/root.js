import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom'

const Loading = <div>Loading.....</div>
const Stats = lazy(()=>import("../pages/StatsPage"))
const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Stats/></Suspense>
    }

])

export default root;