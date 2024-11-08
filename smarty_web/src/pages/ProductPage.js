import React, { useEffect, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ProductPage = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')

    if (token && userStr) {
      setIsLoggedIn(true)
    }
  }, [])
  
  const showMenu = location.pathname === '/product'

  return (
    <BasicLayout>
      <div>
        {showMenu && (
          <div className='w-full flex m-2 p-2'>
            {isLoggedIn && (
              <Link to="/product/add" className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'>
                상품 등록
              </Link>
            )}
            <Link to="/product/list" className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'>
              상품 목록
            </Link>
          </div>
        )}
        <Outlet />
      </div>
    </BasicLayout>
  )
}

export default ProductPage