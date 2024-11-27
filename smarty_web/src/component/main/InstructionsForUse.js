import React from 'react'
import '../../css/instructionsForUse.css'
import { PiUsersLight } from "react-icons/pi";
import { MdClass } from 'react-icons/md';
import { RiShoppingBasket2Line } from 'react-icons/ri';

const InstructionsForUse = ({ clik }) => {

    const features = [
        {
            icon: <PiUsersLight />,
            title: "일일 입장",
            description: "편리한 일일 입장 시스템으로 즐거운 하루를 시작하세요",
            buttonText: "입장 예약하기"
        },
        {
            icon: <MdClass />,
            title: "클래스 예약",
            description: "다양한 클래스를 한눈에 보고 예약하세요",
            buttonText: "클래스 살펴보기"
        },
        {
            icon: <RiShoppingBasket2Line />,
            title: "물품 대여",
            description: "필요한 물품을 간편하게 대여하실 수 있습니다",
            buttonText: "대여 가능 물품"
        }
    ];

    return (
        <div className='InstructionsForUse_container'>
            <h5>INSTRUCTIONS FOR USE</h5>
            <h2>일일입장, 클래스 예약, 물품 대여까지 <br />
                한 번에 해결할 수 있는 스마트한 서비스입니다.</h2>
            <div className='InstructionsForUse_box'>
                {features.map((feature, index) => (
                    <div key={index} className='feature-card'>
                        <div>
                            <div className='feature-icon'>
                                <span style={{ fontSize: '35px', color: '#17468c', }}>
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className='feature-title'>
                                {feature.title}
                            </h3>
                            <p className='feature-description'>
                                {feature.description}
                            </p>
                            <button onClick={() => clik(feature.title)} className='feature-button'>
                                {feature.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default InstructionsForUse;