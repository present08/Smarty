import { Outlet } from "react-router-dom";
import Layout from "../../layout/Layout";

export default function () {
  return (
    <Layout>
        <div>물품 인덱스!!</div>
        <Outlet />
    </Layout>
  )
}
