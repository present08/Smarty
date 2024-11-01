import React from 'react'
import MainNav from './MainNav'
import Footer from './Footer'
import { useLocation } from 'react-router-dom';
import '../css/main.css'
import BackToTopButton from './BackToTopButton';
import Wrapper from './Wrapper';
import Main_Banner from './main/Main_Banner';

const Main = () => {

  const location = useLocation();

  return (
    <div>
      <MainNav />
      <Wrapper>
        <BackToTopButton />
        <Main_Banner />
      </Wrapper>
      <Footer />
    </div>
  )
}

export default Main