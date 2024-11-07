import React, { useState } from 'react'

const Modal = () => {

    const [modal, setModal] = useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }


    return (
        <div>
            <p style={{ marginTop: '3rem' }} onClick={openModal}>날 눌러라</p>
            {modal && (
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    zIndex: '100',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgb(0,0,0,0.8)'
                }}>
                    <div style={{
                        width: '80%',
                        height: '80%',
                        backgroundColor: 'white',
                        borderRadius: '15px'
                    }}>
                        <div>
                            <button style={{
                                width: '80px',
                                height: '30px',
                                backgroundColor: 'red',
                                color: 'white'
                            }} onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Modal;