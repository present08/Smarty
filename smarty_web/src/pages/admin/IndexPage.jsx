import { Outlet } from "react-router-dom";
import Layout from "../../component/admin/layout/Layout";

export default function IndexPage() {
  return (
    <Layout>
        관리자 공통 인덱스!!
        <Outlet />
    </Layout>
  )
}
