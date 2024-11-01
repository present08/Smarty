import { lazy, Suspense } from "react"

const userRouter = () => {

    const Loading = <div>Loading...</div>
    const UserAdd = lazy(() => import("../pages/users/newUser/NewUser"))
    const UserRead = lazy(() => import("../pages/users/userRead/UserRead"))
    const UserModify = lazy(() => import("../pages/users/userModify/UserModify"))

  return [
    {
        path: "add",
        element: <Suspense fallback={Loading}><UserAdd /></Suspense>
    },
    {
        path: "read/:userId",
        element: <Suspense fallback={Loading}><UserRead /></Suspense>
    },
    {
        path: "modify/:userId",
        element: <Suspense fallback={Loading}><UserModify /></Suspense>
    }
  ]
}

export default userRouter