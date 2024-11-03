import { lazy, Suspense } from "react"

const userRouter = () => {

    const Loading = <div>Loading...</div>
    const UserList = lazy(() => import("../pages/users/userList/UserList"))
    const UserAdd = lazy(() => import("../pages/users/newUser/NewUser"))
    const UserRead = lazy(() => import("../pages/users/userRead/UserRead"))
    const UserModify = lazy(() => import("../pages/users/userModify/UserModify"))

  return [
    {
      path: "",
      element: <Suspense fallback={Loading}><UserList /></Suspense>
    },
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