import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Pwchange = lazy(() => import("../pages/user/Pwchange"));
const FindID = lazy(() => import("../pages/user/FindID"));
const FindPassword = lazy(() => import("../pages/user/FindPassword"));
const Login = lazy(() => import("../pages/user/Login"));
const SingUp = lazy(() => import("../pages/user/SingUp"));

const userRouter = () => {
  return [
    {
      path: "login",
      element: <Suspense fallback={<Loading />}><Login /></Suspense>
    },
    {
      path: "signUp",
      element: <Suspense fallback={<Loading />}><SingUp /></Suspense>
    },
    {
      path: "findID",
      element: <Suspense fallback={<Loading />}><FindID /></Suspense>
    },
    {
      path: "find-password",
      element: <Suspense fallback={<Loading />}><FindPassword /></Suspense>
    },
    {
      path: "pwchange",
      element: <Suspense fallback={<Loading />}><Pwchange /></Suspense>
    },
  ]
}

export default userRouter;
