import { Outlet } from "react-router-dom";
import Layout from "../../component/admin/layout/Layout";

export default function IndexPage() {
  return (
    <Layout>
        <Outlet />
    </Layout>
  )
}
