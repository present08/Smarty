import React, { useState } from 'react'
import { AiOutlineAliwangwang, AiOutlineCheckCircle } from 'react-icons/ai'
import { FaQ } from 'react-icons/fa6'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { RiKakaoTalkLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const UserNavber = () => {

    const [isSubMenuVisible, setSubMenuVisible] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuVisible(!isSubMenuVisible);
    };


    return (
        <div style={{ width: '90%', height: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <AiOutlineCheckCircle style={{ width: '30px', height: '30px', color: '#28527a' }} />
                    <div onClick={toggleSubMenu} style={{ cursor: 'pointer', fontSize: '18px', color: 'black', marginLeft: '0.5rem' }}>
                        예약하기
                    </div>
                    {isSubMenuVisible && (
                        <ul className='userSubMenu' style={{ marginLeft: '1rem', width: '200px', height: '40px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', borderRadius: '10px', backgroundColor: '#28527a' }}>
                            <li>
                                <Link to={"/facilityList"} style={{ fontSize: '18px', color: 'aliceblue' }}>일일입장</Link>
                            </li>
                            <li>
                                <Link to={"/classList"} style={{ fontSize: '18px', color: 'aliceblue' }}>수강신청</Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <MdOutlineShoppingCart style={{ width: '30px', height: '30px', color: '#28527a' }} />
                    <Link to={"/product"} style={{ fontSize: '18px', color: 'black', marginLeft: '0.5rem' }}>대여하기</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <FaQ style={{ width: '25px', height: '25px', color: '#28527a' }} />
                    <Link to={"/notice/announce"} style={{ fontSize: '18px', color: 'black', marginLeft: '0.5rem' }}>공지사항</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
                    <RiKakaoTalkLine style={{ width: '30px', height: '30px', color: '#28527a' }} />
                    <a href='http://pf.kakao.com/_ixcRln/chat'>
                        <p style={{ fontSize: '18px', color: 'black', marginLeft: '0.5rem' }}>kakaotalk</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserNavber;