import Layout from '../../layout/Layout'
import { Outlet } from 'react-router-dom'

export default function IndexPage() {
  return (
    <Layout>
        <div>회원 인덱스!!</div>
        <Outlet />
    </Layout>
  )
}
