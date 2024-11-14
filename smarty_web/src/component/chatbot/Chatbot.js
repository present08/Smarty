import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import styled from "styled-components";
import '../../css/Chatbot.css';

const Nav = styled.div`
  overflow: auto;
  height: 40px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(12,34,56, 1);
    border-radius: 6px;
  }
`;


function ChatBot() {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const socket = io('http://localhost:5000', {
            transports: ['websocket'], // 웹소켓만 사용
        });

        setSocket(socket);

        return () => {
            socket.close();
        }
    }, [])

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const chatEndRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const messagesRef = useRef(messages);

    // 스크롤 맨 밑 유지
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        messagesRef.current = messages;
    }, [messages]);

    const handleSendMessage = ({ input, botType }) => {
        if (input) {
            setMessages((prevMessages) => [...prevMessages, { text: input, type: 'user' }]);
            const postData = { Query: input, BotType: botType }
            // 보내는 객체는 Query : 내용
            socket.emit('send_message', postData);
            setInput('');
            setLoading(true)
        }
    };


    return (
        <div style={{ display: 'flex', alignItems: 'center', }}>
            <div style={{ padding: '10px', height: '720px', width: "500px", border: '3px solid #395886', borderRadius: '30px', backgroundColor: '#395886', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.)' }}>
                <Nav style={{ height: '600px', overflow: 'none', width: '90%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '15px', padding: '10px', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', backgroundColor: 'white' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ color: msg.type == 'user' ? "white" : "#212121", borderRadius: msg.type === 'user' ? "30px 30px 0 30px" : "30px 30px 30px 0", backgroundColor: msg.type === 'user' ? "#012345" : '#f5f5f5', padding: "10px", width: msg.type === 'user' ? "40%" : "60%", whiteSpace: 'pre-line', textAlign: msg.type === 'user' ? 'right' : 'left', position: "relative", left: msg.type === 'user' ? '45%' : 0, margin: "20px 0", lineHeight: '25px' }}>
                            <strong>{msg.type === 'user' ? 'You' : 'Bot'} : </strong> {msg.text}
                        </div>
                    ))}
                    {loading && <div style={{ color: "#212121", borderRadius: "50px 50px 50px 0", backgroundColor: '#f5f5f5', padding: "20px 30px", width: "60%", whiteSpace: 'pre-line', textAlign: 'left', position: "relative", left: 0, margin: "20px 0", lineHeight: '25px' }} >
                        <strong>{'Bot'} : </strong>질문 검색중...  <div className='loader'></div>
                    </div>}
                    <div ref={chatEndRef} />
                </Nav>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', width: '90%', height: '65px', alignItems: 'center', borderRadius: "15px", margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', padding: '0px 10px' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="  💬 여기에 물어보세요 !"
                        style={{ width: '70%', lineHeight: '30px', verticalAlign: 'middle', border: 'none', }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage({ input: input, botType: "NORMAL" });
                            }
                        }}
                    />
                    <button style={{ padding: "10px 25px", textAlign: 'center', color: "white", backgroundColor: '#123456', border: 0, borderRadius: "10px", marginLeft: "10px", verticalAlign: 'middle' }} onClick={() => handleSendMessage({ input: input, botType: "NORMAL" })}>전송</button>
                </div >
            </div>
            <div style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '50px 0px 50px 35px',
                borderColor: 'transparent transparent transparent #395886',
            }}></div>

        </div>
    );
}
export default ChatBot;