import React, { useState } from 'react';
import { AiOutlineAliwangwang } from 'react-icons/ai';
import { io } from 'socket.io-client';
import ChatBot from './chatbot/Chatbot';
import axios from 'axios';

const ChatbotButton = () => {

    const [chatbot, setChatbot] = useState(false);
    const [socket, setSocket] = useState(null)

    const chatbotopen = () => {
        console.log(chatbot)
        // if (chatbot) {
        //     socket.close();
        // }
        setChatbot(!chatbot);
        const socket = io('http://localhost:5000', {
            transports: ['websocket'], // 웹소켓만 사용
        });
        setSocket(socket);
    }

    const chatbotClose = (closeData) => {
        console.log("챗봇 종ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ료")
        socket.close();
        chatbotDataSet(closeData);
    }
    const chatbotDataSet = (closeData) => {
        console.log("2312313213",closeData)
        const saveData = async () => {
            const response = await axios.post("http://localhost:5000/save", closeData);
            return response
        };
        if (closeData.user_id != null) {
            saveData().then(e => console.log(e));
        }
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
                    <ChatBot socket={socket} chatbotClose={chatbotClose} />
                </div>
            )}
        </button>
    )
}

export default ChatbotButton