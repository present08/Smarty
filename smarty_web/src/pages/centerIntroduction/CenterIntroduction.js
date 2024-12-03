import React from 'react'
import MainNav from '../../component/MainNav'
import Footer from '../../component/Footer'
import '../../css/centerIntro.css'
import { Link } from 'react-router-dom'
import BackToTopButton from '../../component/BackToTopButton'
import Wrapper from '../../component/Wrapper'
import { PiUsersLight } from 'react-icons/pi'
import { MdClass } from 'react-icons/md'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { AiOutlineForm } from 'react-icons/ai'

const CenterIntroduction = () => {

    const facility = [
        {
            icon: <PiUsersLight />,
            title: "일일 입장",
            description: "SMARTY 센터에서는 하루 동안 필요한 모든 시설을 자유롭게 이용할 수 있는 일일 입장 시스템을 제공합니다. 복잡한 절차 없이 빠르고 간편하게 입장하여, 원하는 시간에 운동, 레슨, 문화 프로그램 등을 자유롭게 즐기세요.",
        },
        {
            icon: <MdClass />,
            title: "클래스 예약",
            description: "체육, 예술, 요가 등 다양한 분야의 클래스를 한눈에 확인하고 예약할 수 있습니다. 스마트한 예약 시스템을 통해 수업의 일정과 인원 제한을 쉽게 관리하고, 원하는 클래스를 원하는 시간에 예약하여 참여하세요.",
        },
        {
            icon: <RiShoppingBasket2Line />,
            title: "물품 대여",
            description: "필요한 물품을 간편하게 대여할 수 있는 서비스입니다. 운동용품부터 의류, 개인 사물함, 스포츠 장비까지 다양한 물품을 센터 내에서 손쉽게 대여하여, 부담 없이 시설을 이용하세요.",
        },
        {
            icon: <AiOutlineForm />,
            title: '커뮤니티',
            description: 'SMARTY 센터에서는 최신 리액트 기술을 활용한 웹 애플리케이션을 통해 회원 간의 소통과 정보를 공유할 수 있습니다. 커뮤니티에서는 센터의 최신 소식, 이벤트, 피드백 등을 쉽게 확인하고 다른 회원들과 의견을 나누는 공간을 제공합니다.',
        },


    ]

    return (
        <>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <div className='centro_container'>
                <div className='submu'>
                    <nav>
                        <Link to="/" style={{ textDecoration: 'none', color: 'black', padding: '10px', paddingLeft: '0' }}>HOME</Link>
                        <p >&gt;</p>
                        <Link to="/center_intro" style={{ textDecoration: 'none', color: '#28537a', fontWeight: 'bold', padding: '10px', marginRight: '10px' }}>센터소개</Link>
                    </nav>
                </div>
                <div className='centro_cont'>
                    <div className='centro_cont_header'>
                        <h1>SMARTY</h1>
                        <h5>SMARTY 센터는 여러분의 건강과 문화적 경험을 위해 설계된 최첨단 시설을 자랑합니다.</h5>
                        <h5>다양한 프로그램이 시간대별로 제공되며, 모든 연령대와 관심사를 아우르는 활동을 통해 누구나 즐겁고 의미 있는 시간을 보낼 수 있습니다.</h5>
                    </div>
                    <div className='centro_cont_vido'>
                        <video
                            src="/img/994015_sports_soccer_football_21082607Family Outdoors4k004.mp4"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(80%)' }}
                            autoPlay={true}
                            muted
                            loop
                        />
                    </div>
                    <div className='center_facility_box'>
                        <div className='center_facility_header'>
                            <h3>Facility information</h3>
                            <p>SMARTY 센터에 오신 것을 환영합니다. 저희 센터는 스포츠, 피트니스, 문화 경험을 위한 최적의 공간을 제공합니다. <br />
                                최신식 시설로는 완벽하게 갖춰진 헬스장, 넓은 실내 스포츠 아레나,편안한 사우나, 그리고 다양한 이벤트 공간이 마련되어 있습니다. 운동, 문화 활동, 휴식을 원하신다면, 스마트 센터에서 모두 제공해 드립니다.</p>
                        </div>
                        <div className='center_facility_body'>
                            {facility.map((facility, index) => (
                                <div key={index} className='facility-card'>
                                    <div>
                                        <span style={{ fontSize: '40px' }}>{facility.icon}</span>
                                    </div>
                                    <div>
                                        <h3>{facility.title}</h3>
                                        <p>{facility.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            </div>
            <Footer />
        </>
    )
}

export default CenterIntroduction
