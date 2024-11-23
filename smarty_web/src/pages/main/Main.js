import React from 'react'
import MainNav from '../../component/MainNav'
import Footer from '../../component/Footer'
import '../../css/main.css'
import BackToTopButton from '../../component/BackToTopButton';
import Wrapper from '../../component/Wrapper';
import Main_Banner from '../../component/main/Main_Banner';
import InstructionsForUse from '../../component/main/InstructionsForUse';
import DailyAdmissions from '../../component/main/DailyAdmissions';

const Main = () => {


  return (
    <div>
      <MainNav />
      <Wrapper>
        <BackToTopButton />
        <Main_Banner />
        <InstructionsForUse />
        <DailyAdmissions />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default Main