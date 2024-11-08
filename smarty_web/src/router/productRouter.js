import React, { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

const Loading = <div> Loading... </div>
const ProductAdd = lazy(() => import("../pages/product/AddPage"))
const ProductEdit = lazy(() => import("../pages/product/EditPage"))
const ProductList = lazy(() => import("../pages/product/ListPage"))
const ProductDetail = lazy(() => import("../pages/product/DetailPage"))

const productRouter = () => {
  return [
    {
      path: "add",
      element: <Suspense fallback={Loading}> <ProductAdd /> </Suspense>
    },
    {
      path: "edit/:product_id",
      element: <Suspense fallback={Loading}> <ProductEdit/> </Suspense>
  },
  {
      path: "list",
      element: <Suspense fallback={Loading}> <ProductList/> </Suspense>
  },
  {
      path: "detail/:product_id",
      element: <Suspense fallback={Loading}> <ProductDetail/> </Suspense>
  },
    
  ]
}

export default productRouter

