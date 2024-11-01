import React from 'react'
import { AiOutlineAliwangwang } from 'react-icons/ai'
import { FaQ } from 'react-icons/fa6'
import { RiKakaoTalkLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const UserNavber = () => {
    return (
        <div style={{ width: '90%', height: '100%', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginBottom: '1rem' }}>
                    <AiOutlineAliwangwang style={{ width: '30px', height: '30px', color: '#28527a' }} />
                    <Link to={"/"} style={{ fontSize: '22px', color: 'black', marginLeft: '0.5rem' }}>chatbot</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginBottom: '1rem' }}>
                    <RiKakaoTalkLine style={{ width: '30px', height: '30px', color: '#28527a' }} />
                    <Link to={"/"} style={{ fontSize: '22px', color: 'black', marginLeft: '0.5rem' }}>kakaotalk</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', marginBottom: '1rem' }}>
                    <FaQ style={{ width: '25px', height: '25px', color: '#28527a' }} />
                    <Link to={"/"} style={{ fontSize: '22px', color: 'black', marginLeft: '0.5rem' }}>announcement</Link>
                </div>
            </div>
        </div>
    )
}

export default UserNavber