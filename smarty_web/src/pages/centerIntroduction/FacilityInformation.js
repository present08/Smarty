import React from 'react'
import MainNav from '../../component/MainNav'
import Footer from '../../component/Footer'
import '../../css/facilityInformation.css'
import { Link } from 'react-router-dom'
import BackToTopButton from '../../component/BackToTopButton'
import Wrapper from '../../component/Wrapper'

const FacilityInformation = () => {

  const handleScrollToDiv = (divId) => {
    const element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <MainNav />
      <Wrapper>
        <BackToTopButton />
        <div className='facility-container'>
          <div className='submu'>
            <nav>
              <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
              <p >&gt;</p>
              <Link to="/center/center_in" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>센터소개</Link>
              <p >&gt;</p>
              <Link to="/center/facility" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>시설안내</Link>
            </nav>
          </div>
          <div>
            <h3>시설안내</h3>
            <div className='butBox'>
              <button onClick={() => handleScrollToDiv('oneDiv')}>1F</button>
              <button onClick={() => handleScrollToDiv('twoDiv')}>2F</button>
              <button onClick={() => handleScrollToDiv('outdoorDiv')}>야외</button>
            </div>
          </div>
          <div className='facility-cont'>
            <div id='oneDiv' className='one-box'>
              <div className='imgBox'>
                <img src="/img/lobby1.jpeg" alt="일층로비이미지"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
              <div className='one-intro'>
                <div className='text_but'>
                  <h3>1F</h3>
                  <p>1층은 복합문화체육시설의 중심이 되는 공간으로, 회원들의 다양한 활동을 편리하고 쾌적하게 즐길 수 있도록 설계된 다목적 구역입니다.
                    이 공간은 모든 연령대와 관심사를 아우르는 다양한 스포츠 및 편의시설을 제공하며, 시설을 처음 방문한
                    사람부터 정기적으로 이용하는 회원들까지 모두에게 만족스러운 경험을 선사함</p>
                  <button>
                    <Link to={"/1f"}>
                      더보기
                    </Link>
                  </button>
                  <ul>
                    <li>
                      <dt>규모</dt>
                      <dd>10,368m²</dd>
                    </li>
                    <li>
                      <dt>주요용도</dt>
                      <dd>체육시설</dd>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div id='twoDiv' className='two-box'>
              <div className='two-intro'>
                <div className='text_but'>
                  <h3>2F</h3>
                  <p>
                    2층은 이러한 다양한 시설들이 서로 연계되어 운영됨으로써, 방문객들에게 건강과 문화의 조화를
                    이룰 수 있는 환경을 재공합니다. 이는 지역 주민들이 스포츠와 문화를 통해 즐거운 시간을 보낼 수
                    있도록 돕는 공간으로, 지역 사회의 발전과 화합에도 기여하는 중요한 역할을 수행합니다. 각종
                    프로그램과 이벤트를 통해 사람들의 삶의 질을 높이는데 기여하고 있으며, 모든 방문객에게 기억에
                    남는 경험을 선사합니다
                  </p>
                  <button>
                    <Link to={"/1f"}>
                      더보기
                    </Link>
                  </button>
                  <ul>
                    <li>
                      <dt>규모</dt>
                      <dd>10,908m²</dd>
                    </li>
                    <li>
                      <dt>주요용도</dt>
                      <dd>체육시설</dd>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='two-imgBox'>
                <img src="/img/lobby2.jpeg" alt="일층로비이미지"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
            </div>
            <div id='outdoorDiv' className='outdoor-box'>
              <div className='imgBox'>
                <img src="/img/outdoor_soccer.jpeg" alt="일층로비이미지"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>
              <div className='outdoor-intro'>
                <div className='text_but'>
                  <h3>야외</h3>
                  <p>
                    복합문화체육시설의 야외 공간은 스포츠와 레저, 휴식, 사회적 교류를 위한 다목적 공간으로 조성되어 있습니다. 다양한 시설과 프로그램이 마련되어 있어 모든 연령대의 방문객들이 즐거운 경험을 할 수 있습니다. 야외에서 활동적인 시간을 보내고, 자연과의 교감을 통해 건강한 라이프스타일을 추구할 수 있는 이상적인 장소입니다. 이러한 야외 공간은 지역 사회의 발전과 활성화에 기여하며, 방문객들에게 잊지 못할 추억을 선사합니다.
                  </p>
                  <button>
                    <Link to={"/1f"}>
                      더보기
                    </Link>
                  </button>
                  <ul>
                    <li>
                      <dt>규모</dt>
                      <dd>10,338m²</dd>
                    </li>
                    <li>
                      <dt>주요용도</dt>
                      <dd>체육시설,휴게공간</dd>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  )
}

export default FacilityInformation