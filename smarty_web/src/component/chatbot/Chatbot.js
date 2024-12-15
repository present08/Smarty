import React, { useEffect, useRef, useState } from 'react';
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
function ChatBot(props) {
    const { socket, chatbotClose } = props
    // const [socket, setSocket] = useState(socketinfo)
    //   useEffect(() => {
    //     const socket = io('http://localhost:5000', {
    //         transports: ['websocket'], // 웹소켓만 사용
    //     });

    //     setSocket(socket);

    //     return () => {
    //         socket.close();
    //     }
    // }, [])

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

    useEffect(() => {
        const firstMsg =
            <div>
                안녕하세요. Smarty Chat-bot입니다.<br />
                다음과 같은 기능을 제공하고 있으니, 편하게 이용부탁드려요😁<br />
                사용예시 - &#91;시설명&#93;번호 알려줘, &#91;시설명&#93;위치 알려줘<br />
                사용예시2 - &#91;시설/강의명&#91; 강의정보 알려줘, 주차정보 알려줘<br />
                답변 받고 싶은 질문을 입력해주시면 빠르게 업데이트 하겠습니다.<br /><br />
                <br /><br />
                <span style={{ fontSize: "12px" }}>※ 회원 로그인을 하지않을 시 채팅 내역이 저장되지 않습니다. ※</span>
                <button style={{ padding: "15px 25px", textAlign: 'center', color: "white", backgroundColor: '#123456', border: 0, borderRadius: "10px" }} onClick={() => handleSendMessage({ input: "시설", botType: "QUICK" })}>시설</button>
                <button style={{ padding: "15px 25px", textAlign: 'center', color: "white", backgroundColor: '#123456', border: 0, borderRadius: "10px", marginLeft: "10px" }} onClick={() => handleSendMessage({ input: "예약", botType: "QUICK" })}>예약</button>
            </div>
        setMessages((prevMessages) => [...prevMessages, { text: firstMsg, type: 'bot' }]);

        // NORMAL TYPE
        socket.on('receive_normal', (data) => {
            // json 문자열을 받아오기 때문에 json객체로 변환 (parse)
            const messageData = JSON.parse(data.response);
            // replaceAll 대신 정규식으로 사용 replace(/'이자리에 단어'/g, '변경할 단어')
            // 이때 g는 발생한 모든단어, i는 대소문자 구분x, m은 여러줄 검색
            const msg = messageData.Answer.replace(/\\n/g, "\n")
            setMessages((prevMessages) => [...prevMessages, { text: msg, type: 'bot' }]);
            setLoading(false);
        });

        // QUICK TYPE
        socket.on('receive_quick', (data) => {
            const messageData = JSON.parse(data.response);
            console.log(messageData)

            // 첫 분류
            const quickMsg = idx => {
                const question = messageData.question[idx];
                const message = (
                    <div>
                        {question.answer}
                        <br /><br />
                        {question.items.map((item, idx) => (
                            <button style={{ padding: "15px 15px", textAlign: 'center', color: "white", backgroundColor: '#123456', border: 0, borderRadius: "10px", marginLeft: "10px" }} key={idx} onClick={() => quickTitle(item)}>{item.title}</button>
                        ))}
                    </div>
                );
                setMessages((prevMessages) => [...prevMessages, { text: message, type: 'SmartyBot' }]);
                setLoading(false);
            }

            // 두번쨰 분류
            const quickTitle = (item) => {
                setMessages((prevMessages) => [...prevMessages, { text: item.title, type: 'user' }]);
                const message =
                    <div><img src={item.images} style={{ width: "350px" }} /><br /><br />{item.content}</div>

                setMessages((prevMessages) => [...prevMessages, { text: message, type: 'SmartyBot' }]);
            }

            const questionMap = {
                [messageData.question[0].text]: () => quickMsg(0),
                [messageData.question[1].text]: () => quickMsg(1),
            };

            const action = questionMap[data.Query];
            if (action) {
                action();
            }
        });
        return () => {
            let user_id;
            try {
                user_id = JSON.parse(localStorage.getItem("user")).user_id;
            } catch (error) {
                user_id = null;
            }
            // const saveData = async () => {
            //     const response = await axios.post("http://localhost:5000/save", { messages: messagesRef.current, timestamp: new Date(), user_id });
            //     return response
            // };
            // if (user_id != null) {
            //     saveData().then(e => console.log(e));
            // }
            socket.off('receive_normal');
            socket.off('receive_quick');
            console.log("231321321321312,", messagesRef.current)
            chatbotClose({ messages: messagesRef.current, timestamp: new Date(), user_id })
        };
    }, []);

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
            <div style={{ padding: '10px', height: '720px', width: "700px", border: '3px solid #395886', borderRadius: '30px', backgroundColor: '#395886', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.)' }}>
                <Nav style={{ height: '600px', overflow: 'none', width: '90%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '15px', padding: '10px', margin: '0 auto', marginTop: '1rem', marginBottom: '1rem', backgroundColor: 'white' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ color: msg.type == 'user' ? "white" : "#212121", borderRadius: msg.type === 'user' ? "30px 30px 0 30px" : "30px 30px 30px 0", backgroundColor: msg.type === 'user' ? "#012345" : '#f5f5f5', width: msg.type === 'user' ? "40%" : "60%", whiteSpace: 'pre-line', textAlign: msg.type === 'user' ? 'right' : 'left', padding: msg.type === 'user' ? '10px 20px 10px 10px' : '10px', position: "relative", left: msg.type === 'user' ? '55%' : 0, margin: "20px 0", lineHeight: '25px' }}>
                            <strong>{msg.type === 'user' ? 'You' : 'SmartyBot'} : </strong> {msg.text}
                        </div>
                    ))}
                    {loading && <div style={{ color: "#212121", borderRadius: "50px 50px 50px 0", backgroundColor: '#f5f5f5', padding: "20px 30px", width: "60%", whiteSpace: 'pre-line', textAlign: 'left', position: "relative", left: 0, margin: "20px 0", lineHeight: '25px' }} >
                        <strong>{'SmartyBot'} : </strong>질문 검색중...  <div className='loader'></div>
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