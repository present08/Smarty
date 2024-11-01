import React from 'react'
import { AiOutlineAliwangwang } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ChatbotButton = () => {
    return (
        <button
            style={{ width: '55px', height: '55px', borderRadius: '50px', border: 'none', }}
        >
            <Link to={"/"}>
                <AiOutlineAliwangwang style={{ width: '50px', height: '50px', color: '#3e83a8' }} />
            </Link>
        </button>
    )
}

export default ChatbotButton