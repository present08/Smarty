import { Outlet } from "react-router-dom";
import Layout from "../../layout/Layout";

export default function IndexPage() {
  return (
    <Layout>
        <div>시설 인덱스!!</div>
        <Outlet />
    </Layout>
  )
}
