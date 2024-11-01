import { lazy, Suspense } from "react"

const productRouter = () => {

    const Loading = <div>Loading...</div>
    const ProductAdd = lazy(() => import("../pages/products/newProduct/NewProduct"))
    const ProductRead = lazy(() => import("../pages/products/productRead/ProductRead"))
    const ProductModify = lazy(() => import("../pages/products/productModify/ProductModify"))

  return [
    {
        path: "add",
        element: <Suspense fallback={Loading}><ProductAdd /></Suspense>
    },
    {
        path: "read/:productId",
        element: <Suspense fallback={Loading}><ProductRead /></Suspense>
    },
    {
        path: "modify/:productId",
        element: <Suspense fallback={Loading}><ProductModify /></Suspense>
    }
  ]
}

export default productRouter