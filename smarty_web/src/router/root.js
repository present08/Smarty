import { SyncLoader } from "react-spinners";
import newNoticeRouter from "./newNoticeRouter";
const { createBrowserRouter, Outlet } = require("react-router-dom")

const Loading = <div><SyncLoader /></div>
// MainPage 로딩 지연

const root = createBrowserRouter([
    {
        path: "notice",
        children: newNoticeRouter()
    },
])

export default root;