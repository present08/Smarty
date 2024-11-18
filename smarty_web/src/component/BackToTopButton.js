import React from 'react'
import { AiOutlineCaretUp } from 'react-icons/ai';
import ChatbotButton from './ChatbotButton';

const BackToTopButton = () => {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{
            width: '70px', height: '150px', backgroundColor: '#011b2f', borderRadius: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '3px solid #8ac4d0', position: 'fixed', right: '2%', bottom: '40%', zIndex: '1', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)'
        }}>
            <button className='topbut'
                style={{ width: '55px', height: '55px', borderRadius: '50px', border: 'none', marginBottom: '1rem', }}
                onClick={scrollToTop}
            ><AiOutlineCaretUp style={{ width: '50px', height: '50px', color: '#3e83a8' }} /></button>
            <ChatbotButton />
        </div>
    )
}

export default BackToTopButton;