import React from 'react';
import RentalList from '../../component/product/RentalList';
import MainNav from '../../component/MainNav';
import Wrapper from '../../component/Wrapper';
import Footer from '../../component/Footer';
import '../../css/rentaListPage.css'; // CSS 연결

const RentalListPage = () => {
  return (
    <div className="rental-page-container">
      {/* 상단 네비게이션 */}
      <MainNav />
      <Wrapper />

      {/* 메인 컨텐츠 */}
      <div className="rental-content">
        <h1 className="rental-title">내 대여 목록</h1>
        <RentalList />
      </div>
      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};

export default RentalListPage;
