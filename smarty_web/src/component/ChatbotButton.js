import React, { useState } from 'react'
import { AiOutlineAliwangwang } from 'react-icons/ai'
import ChatBot from './chatbot/Chatbot';

const ChatbotButton = () => {

    const [chatbot, setChatbot] = useState(false);

    const chatbotopen = () => {
        setChatbot(!chatbot);
    }

    return (
        <button
            style={{ width: '55px', height: '55px', borderRadius: '50px', border: 'none', }}
        >
            <AiOutlineAliwangwang onClick={chatbotopen} style={{ width: '50px', height: '50px', color: '#3e83a8' }} />
            {chatbot && (
                <div style={{
                    position: 'fixed', top: '17%', right: '6.5%'
                }}>
                    <ChatBot />
                </div>
            )}
        </button>
    )
}

export default ChatbotButton