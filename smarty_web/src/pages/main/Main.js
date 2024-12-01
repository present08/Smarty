import React, { useRef } from 'react'
import MainNav from '../../component/MainNav'
import Footer from '../../component/Footer'
import '../../css/main.css'
import BackToTopButton from '../../component/BackToTopButton';
import Wrapper from '../../component/Wrapper';
import Main_Banner from '../../component/main/Main_Banner';
import InstructionsForUse from '../../component/main/InstructionsForUse';
import DailyAdmissions from '../../component/main/DailyAdmissions';
import MainProductList from '../../component/main/MainProductList';
import MainClassList from '../../component/main/MainClassList';
import ShortBanner from '../../component/main/ShortBanner';
import NoticeAndCommunication from '../../component/main/NoticeAndCommunication';

const Main = () => {

  const daliyRef = useRef();
  const productRef = useRef();
  const classRef = useRef();

  const handleScrollToDiv = (title) => {
    console.log("이동완료", title)
    switch (title) {
      case "일일 입장":
        daliyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case "클래스 예약":
        classRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case "물품 대여":
        productRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;

    }
  }

  return (
    <div>
      <MainNav />
      <Wrapper>
        <BackToTopButton />
        <Main_Banner />
        <InstructionsForUse clik={handleScrollToDiv} />
        <div ref={daliyRef} ></div>
        <DailyAdmissions />
        <NoticeAndCommunication />
        <div ref={classRef} ></div>
        <MainClassList />
        <ShortBanner />
        <div ref={productRef} ></div>
        <MainProductList />
        {/* <div style={{ width: '100%', height: '50vh' }}>
          <video
            src="/img/994015_sports_soccer_football_21082607Family Outdoors4k004.mp4"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(80%)' }}
            autoPlay={true}
            muted
            loop
          />
        </div> */}
      </Wrapper>
      <Footer />
    </div>
  )
}

export default Main