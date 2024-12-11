import React from 'react'
import RentalList from '../../component/product/RentalList'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import Footer from '../../component/Footer'

const RentalListPage = () => {
  return (
    <div>
        <MainNav />
        <Wrapper />
      <div>
        <RentalList />
      </div>
      <Footer />
    </div>
  )
}

export default RentalListPage