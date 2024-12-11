import React, { useState } from 'react'
import { AiOutlineAliwangwang } from 'react-icons/ai'
import ChatBot from './chatbot/Chatbot';
import { io } from 'socket.io-client';

const ChatbotButton = () => {

    const [chatbot, setChatbot] = useState(false);
    const [socket, setSocket] = useState(null)

    const chatbotopen = () => {
        if (chatbot) {
            socket.close();
        }
        setChatbot(!chatbot);
        const socket = io('http://localhost:5000', {
            transports: ['websocket'], // 웹소켓만 사용
        });
        setSocket(socket);
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
                    <ChatBot props={socket} />
                </div>
            )}
        </button>
    )
}

export default ChatbotButton