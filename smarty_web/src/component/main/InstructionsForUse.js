import React from 'react'
import '../../css/instructionsForUse.css'
import { PiUsersLight } from "react-icons/pi";
import { MdClass } from 'react-icons/md';
import { RiShoppingBasket2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const InstructionsForUse = () => {

    const features = [
        {
            icon: <PiUsersLight />,
            title: "일일 입장",
            description: "편리한 일일 입장 시스템으로 즐거운 하루를 시작하세요",
            buttonText: "입장 예약하기",
            link: "/facilityList"
        },
        {
            icon: <MdClass />,
            title: "클래스 예약",
            description: "다양한 클래스를 한눈에 보고 예약하세요",
            buttonText: "클래스 살펴보기",
            link: "/classList"
        },
        {
            icon: <RiShoppingBasket2Line />,
            title: "물품 대여",
            description: "필요한 물품을 간편하게 대여하실 수 있습니다",
            buttonText: "대여 가능 물품",
            link: "/product"
        }
    ];

    return (
        <div className='InstructionsForUse_container'>
            <h2>INSTRUCTIONS FOR USE</h2>
            <p>일일입장, 클래스 예약, 물품 대여까지 한 번에 해결할 수 있는 스마트한 서비스입니다.</p>
            <div className='InstructionsForUse_box'>
                {features.map((feature, index) => (
                    <div key={index} className='feature-card'>
                        <div>
                            <div className='feature-icon'>
                                <span
                                    style={{
                                        fontSize: '35px',
                                        color: '#17468c',
                                    }}
                                >
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className='feature-title'>{
                                feature.title}
                            </h3>
                            <p className='feature-description'>
                                {feature.description}
                            </p>
                            <button className='feature-button'>
                                <Link to={feature.link}>
                                    {feature.buttonText}
                                </Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default InstructionsForUse;