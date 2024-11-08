import React, { lazy, Suspense } from 'react'
import rentalRouter from './rentalRouter'
import productRouter from './productRouter'

const { createBrowserRouter } = require("react-router-dom")

const Loading = <div> Loading... </div>
const Main = lazy(() => import("../pages/MainPage"))
const Product = lazy(() => import("../pages/ProductPage"))
const Rental = lazy(() => import("../pages/RentalPage"))
const Login = lazy(() => import("../pages/LoginPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}> <Main/> </Suspense>
    },
    {
        path: "login",
        element: <Suspense fallback={Loading}> <Login/> </Suspense>
    },
    {
        path: "product",
        element: <Suspense fallback={Loading}> <Product/> </Suspense>,
        children: productRouter()
    },
    {
        path: "rental",
        element: <Suspense fallback={Loading}> <Rental/> </Suspense>,
        children: rentalRouter()
    },
    
    

])

export default root