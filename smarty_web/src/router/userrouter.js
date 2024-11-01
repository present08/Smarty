import { Suspense, lazy } from "react";

const Loading = () => <div>Loading....</div>;

const Pwchange = lazy(() => import("../component/user/Pwchange"));
const FindID = lazy(() => import("../component/user/FindID"));
const FindPassword = lazy(() => import("../component/user/FindPassword"));
const Login = lazy(() => import("../component/user/Login"));
const SingUp = lazy(() => import("../component/user/SingUp"));

const userrouter = () => {
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

export default userrouter;
